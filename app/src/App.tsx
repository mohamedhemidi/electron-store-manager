import { useState } from 'react';
import './App.css';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const api = (window as any).api;

  const [name, setName] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleSubmit = async (): Promise<void> => {
    await api.send('createClient', name);
  };

  return (
    <>
      <div className="flex flex-col gap-12 justify-center items-center">
        <h1 className="text-3xl font-bold">Electron From React Vite</h1>
        <input
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
        />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Create Client
        </button>
      </div>
    </>
  );
}

export default App;
