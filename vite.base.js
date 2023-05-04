// vite.config.js

import path from 'path';

export default {
  // ...
  resolve: {
    alias: {
      store: path.resolve(__dirname, './libs/store'),
    },
  },
};
