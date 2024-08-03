import { useContext, useEffect, useState } from 'react';
import channels from '../../constants/channels';
import { AppContext } from '../../contexts/AppContext';

const CreateClient = () => {
  const api = useContext(AppContext);

  const chn = channels;

  const [name, setName] = useState<string>('');
  const [clients, setClients] = useState<{ id: string; name: string }[] | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleSubmit = async () => {
    await api.send(chn.CreateClientRequest, name);
    api.send(chn.ClientsListRequest, 'parameters');
  };

  const fetchClientsList = () => {
    if (api) {
      api.send(chn.ClientsListRequest, 'parameters');
      api.receive(
        chn.ClientsListReceive,
        (data: { id: string; name: string }[]) => {
          console.log('HTTP DATA', data);
          setClients(data);
        }
      );
    }
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
      {clients &&
        clients.map((c) => {
          return <p>{c.name}</p>;
        })}
    </>
  );
};

export default CreateClient;
