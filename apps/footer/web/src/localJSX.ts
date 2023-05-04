import { autorun, configure } from 'mobx';

configure({
  enforceActions: 'never',
});

export type HTMLDestroyElement = HTMLElement & { destroy: Function };

// Typescript complains when React is undefined while working with JSX,
// even if you're not using it
declare global {
  const React: any;
  const JSX: any;
}

// Critical JSX replacement

(window as any).rxjsx = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    let element = document.createTextNode('');
    autorun(() => {
      const newElement = tag(props, ...children);
      element.replaceWith(newElement);
      element = newElement;
    });
    return element;
  }
  const element = document.createElement(tag);

  Object.entries(props || {}).forEach(([name, value]: [string, any]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2), value);
    } else {
      element.setAttribute(name, value?.toString());
    }
  });

  children.forEach((child) => {
    appendChild(element, child);
  });

  return element;
};

(window as any).JSX = (window as any).rxjsx;

const appendChild = (parent, child) => {
  if (Array.isArray(child))
    child.forEach((nestedChild) => appendChild(parent, nestedChild));
  else
    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
};
