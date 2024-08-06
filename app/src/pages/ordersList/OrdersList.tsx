import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import channels from '../../constants/channels';
import moment from 'moment';

export interface IOrder {
  id: string;
  client_name: string;
  clientId: string | null;
  weight: number;
  price: number;
  color: string;
  type: string;
  dueDate: string;
  notes: string;
  createdAt: string;
}

const OrdersList = () => {
  const navigate = useNavigate();
  const api = useContext(AppContext);
  const chn = channels;

  const [id, setId] = useState<string>();

  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const [note, setNote] = useState<string>('');

  const fetchOrdersList = () => {
    if (api) {
      api.send(chn.OrdersListRequest, 'parameters');
      api.receive(chn.OrdersListReceive, (data: IOrder[]) => {
        setOrders(data);
      });
    }
  };

  const deleteOrder = async () => {
    if (api) {
      api.send(chn.DeleteOrderRequest, id);
      await api.send(chn.OrdersListRequest);
    }
  };

  useEffect(() => {
    fetchOrdersList();
  }, []);

  return (
    <>
      <div className="p-6">
        <div className="page-header flex justify-between items-center bg-white p-6 mb-6  rounded-md">
          <h1>Orders List</h1>
          <button
            onClick={() => navigate('/order/create')}
            className="btn btn-success text-white font-semibold"
          >
            + Create Order
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
                    <th>Client Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Color</th>
                    <th>Type</th>
                    <th>Due Date</th>
                    <th>Notes</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((c, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{c.client_name}</td>
                          <td>{c.weight}</td>
                          <td>{c.price}</td>
                          <td>{c.color}</td>
                          <td>{c.type}</td>
                          <td>{moment(c.dueDate).calendar()}</td>
                          <td>
                            <a
                              href="#my_modal_9"
                              onClick={() => setNote(c.notes)}
                            >
                              {c.notes}
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
                                navigate(`/order/edit/${c.id}`, { state: c })
                              }
                            >
                              <img src={EditIcon} className="h-6 w-6" />
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

        {/* Delete Order Modal */}
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Order</h3>
            <p className="py-4">
              Please confirm deleting the order by clicking the button below
            </p>
            <div className="modal-action">
              <a href="#" className="btn" onClick={() => deleteOrder()}>
                Delete
              </a>
            </div>
          </div>
        </div>
        {/* Notes Modal */}
        <div className="modal" role="dialog" id="my_modal_9">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Note</h3>
            <p className="py-4">{note}</p>
            <div className="modal-action">
              <a href="#" className="btn" onClick={() => setNote('')}>
                Close
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersList;
