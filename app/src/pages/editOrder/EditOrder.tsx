import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import channels from '../../constants/channels';
import { IOrder } from '../ordersList/OrdersList';

const orderData = {
  client_name: '',
  clientId: null,
  weight: 0,
  price: 0,
  color: '',
  type: '',
  dueDate: '',
  notes: '',
};

const EditOrder = () => {
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();
  const api = useContext(AppContext);
  const chn = channels;

  const [newOrder, setNewOrder] = useState<Omit<IOrder, 'id' | 'createdAt'>>(
    location.state
  );

  const [clients, setClients] = useState<
    { id: string; createdAt: string; name: string }[] | null
  >(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSubmit = async () => {
    if (api) {
      await api.send(chn.UpdateOrderRequest, { orderId: id, order: newOrder });
      await api.send(chn.OrdersListRequest);
      navigate('/order/list');
    }
  };

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

  useEffect(() => {
    fetchClientsList();
  }, []);

  const handleClientChangeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.selectedOptions[0];
    // handleInputChange(e);
    setNewOrder({
      ...newOrder,
      client_name: selectedOption.dataset.name!,
      clientId: e.target.value,
    });
  };

  const resetForm = () => {
    setNewOrder(orderData);
  };

  return (
    <>
      <div className="p-6">
        <div
          className="breadcrumbs mb-2 flex flex-row items-center cursor-pointer"
          onClick={() => navigate('/order/list')}
        >
          <div className="w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </div>
          {/* <p className="text-base w-full">{en['back_to_list']}</p> */}
          <p className="text-base w-full">Back to list</p>
        </div>
        <div className="page-header flex justify-between items-center bg-white p-6 mb-6  rounded-md">
          <h1>Edit Order</h1>
        </div>

        <div className="page-content p-6 bg-white rounded-md">
          <button className="btn btn-info" onClick={resetForm}>
            Reset
          </button>
          <div className="flex flex-col gap-6 items-center w-72 m-auto">
            <input
              placeholder="Client name"
              className="input input-bordered w-full max-w-xs"
              value={newOrder.client_name}
              onChange={handleInputChange}
              type="text"
              disabled={newOrder.clientId ? true : false}
              name="client_name"
            />
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleClientChangeInput}
              name="clientId"
            >
              <option value={newOrder.clientId!} selected disabled>
                Choose client
              </option>
              {clients &&
                clients.length &&
                clients.map((c, index) => (
                  <option key={index} data-name={c.name} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <label className="text-left w-full text-sm">Weight</label>
            <input
              placeholder="Weight"
              className="input input-bordered w-full max-w-xs"
              value={newOrder.weight}
              onChange={handleInputChange}
              type="number"
              name="weight"
            />
            <label className="text-left w-full text-sm">Price</label>
            <input
              placeholder="Price"
              className="input input-bordered w-full max-w-xs"
              value={newOrder.price}
              onChange={handleInputChange}
              type="number"
              name="price"
            />

            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleInputChange}
              name="type"
              defaultValue={newOrder.type}
            >
              <option value={newOrder.type} disabled>
                Choose type
              </option>
              <option value={'coloring'}>صباغة</option>
              <option value={'cleaning'}>تنظيف</option>
            </select>
            <input
              placeholder="Order Color"
              className="input input-bordered w-full max-w-xs"
              value={newOrder.color}
              onChange={handleInputChange}
              type="text"
              name="color"
            />
            <input
              className="input input-bordered w-full max-w-xs"
              onChange={handleInputChange}
              value={newOrder.dueDate}
              type="date"
              name="dueDate"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Notes"
              name="notes"
              value={newOrder.notes}
              onChange={handleInputChange}
            ></textarea>
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Create
            </button>

            {/* {errors && errors.length && (
              <div className="border border-red-700 rounded-md p-4 flex flex-col justify-center gap-2">
                {errors.map((e, index) => (
                  <p key={index} className="text-xl text-red-700">
                    {e}
                  </p>
                ))}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrder;
