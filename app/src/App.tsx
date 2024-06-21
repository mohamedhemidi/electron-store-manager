import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const api = (window as any).api;

  const [name, setName] = useState('');
  const [clients, setClients] = useState([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    await api.send('client:create:request', name);
    api.send('client:list:request', 'parameters');
  };

  const fetchClientsList = () => {
    api.send('client:list:request', 'parameters');
    api.receive(
      'client:list:response',
      (data: { id: string; name: string }) => {
        setClients(data);
      }
    );
  };

  useEffect(() => {
    fetchClientsList();
  }, []);

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
      {clients.map((c) => {
        return <p>{c.name}</p>;
      })}
    </>
  );
}

export default App;
