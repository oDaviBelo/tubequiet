import { createRoot } from 'react-dom/client';
import './index.css';
export const App = () => {
  return (
    <>
      <div className="">
        <h1 className="">TubeQuiet: Eliminate distractions, use the essential</h1>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
