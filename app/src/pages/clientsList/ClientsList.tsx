import { useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import channels from '../../constants/channels';
import moment from 'moment';
const ClientsList = () => {
  const navigate = useNavigate();
  const api = useContext(AppContext);
  const chn = channels;

  const [id, setId] = useState<string>();
  const [clients, setClients] = useState<
    | {
        createdAt: string;
        id: string;
        name: string;
      }[]
    | null
  >(null);

  const fetchClientsList = () => {
    if (api) {
      api.send(chn.ClientsListRequest, 'parameters');
      api.receive(
        chn.ClientsListReceive,
        (data: { id: string; name: string; createdAt: string }[]) => {
          setClients(data);
        }
      );
    }
  };

  const deleteClient = async () => {
    if (api) {
      api.send(chn.DeleteClientRequest, id);
      await api.send(chn.ClientsListRequest);
    }
  };

  useEffect(() => {
    fetchClientsList();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="page-header flex justify-between items-center bg-white p-6 mb-6  rounded-md">
          <h1>Clients List</h1>
          <button
            onClick={() => navigate('/client/create')}
            className="btn btn-success text-white font-semibold"
          >
            + Create Client
          </button>
        </div>
        <div className="p-6 bg-white rounded-md">
          <div className="table-section">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients &&
                    clients.map((c, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>
                            <a
                              className="cursor-pointer"
                              onClick={() =>
                                navigate('/client/order/list', { state: c.id })
                              }
                            >
                              {c.name}
                            </a>
                          </td>
                          <td>
                            {moment(c.createdAt).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </td>
                          <td className="flex gap-2 items-center">
                            <button
                              className="btn btn-circle"
                              onClick={() =>
                                navigate(`/client/edit/${c.id}`, { state: c })
                              }
                            >
                              <img src={EditIcon} className="h-6 -w-6" />
                            </button>
                            <button className="btn btn-circle">
                              <a href="#my_modal_8" onClick={() => setId(c.id)}>
                                <img src={DeleteIcon} className="h-6 w-6" />
                              </a>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete Client Modal */}
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Client</h3>
            <p className="py-4">
              Please confirm deleting the client by clicking the button below
            </p>
            <div className="modal-action">
              <a href="#" className="btn" onClick={() => deleteClient()}>
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientsList;
