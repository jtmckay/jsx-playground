import { Subject } from 'rxjs';
import Navbar from './components/Navbar';

export const destruction$ = new Subject();

export default function App() {
  return <Navbar destruction$={destruction$} />;
}
