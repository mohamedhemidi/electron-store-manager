import { ReactElement, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
// import { ValidateOrder } from '../../utils/OrderValidation';
import channels from '@shared/constants/channels'
import IOrder from '@renderer/types/Order'
import { PageHeader } from '@renderer/components/pageHeader'
import Breadcrumps from '@renderer/components/Breadcrumps/Breadcrumps'
import getTranslation from '@renderer/utils/getTranslation'
import IClientResponse from '@shared/types/ClientsResponse'

const orderData = {
  client_name: '',
  clientId: null,
  weight: 0,
  price: 0,
  color: '',
  type: '',
  dueDate: '',
  notes: ''
}

const CreateOrder = (): ReactElement => {
  const api = useContext(AppContext)

  const navigate = useNavigate()

  const chn = channels

  const content = getTranslation()

  const [newOrder, setNewOrder] = useState<Omit<IOrder, 'id' | 'createdAt'>>(orderData)

  const [clients, setClients] = useState<{ id: string; createdAt: string; name: string }[] | null>(
    null
  )

  // const [errors, setErrors] = useState<string[]>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target
    setNewOrder({ ...newOrder, [name]: value })
  }

  const handleSubmit = async (): Promise<void> => {
    console.log(newOrder)
    if (api) {
      await api.send(chn.CreateOrderRequest, newOrder)
      await api.send(chn.OrdersListRequest)
      navigate('/order/list')
    }

    // setErrors([]);
    // const validationResult = await ValidateOrder(newOrder);
    // if (validationResult.valid) {

    //   if (api) {
    //     await api.send(chn.CreateOrderRequest, newOrder);
    //     await api.send(chn.OrdersListRequest);
    //     navigate('/order/list');
    //   }
    // } else {
    //   setErrors(validationResult.errorMessages);
    // }
  }
  const fetchClientsList = (): void => {
    if (api) {
      api.send(chn.ClientsListRequest)
      api.receive(chn.ClientsListReceive, (data: IClientResponse) => {
        setClients(data.data)
      })
    }
  }

  useEffect(() => {
    fetchClientsList()
  }, [])

  const handleClientChangeInput = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedOption = e.target.selectedOptions[0]
    // handleInputChange(e);
    setNewOrder({
      ...newOrder,
      client_name: selectedOption.dataset.name!,
      clientId: e.target.value
    })
  }

  const resetForm = (): void => {
    setNewOrder(orderData)
  }

  return (
    <>
      <div className="p-6">
        <Breadcrumps path="/order/list">{content.back_to_list}</Breadcrumps>

        <PageHeader>
          <h1 className="dark:text-white">{content.create_order}</h1>
        </PageHeader>

        <div className="page-content p-6 bg-white  dark:bg-slate-950 rounded-md">
          <button className="btn btn-info" onClick={resetForm}>
            {content.reset}
          </button>
          <div className="flex flex-col gap-6 items-center w-72 m-auto">
            <input
              placeholder={content.client_name}
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
              <option value="" selected disabled>
                {content.choose_client}
              </option>
              {clients &&
                clients.length &&
                clients.map((c, index) => (
                  <option key={index} data-name={c.name} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <label className="text-left w-full text-sm">{content.weight}</label>
            <input
              placeholder={content.weight}
              className="input input-bordered w-full max-w-xs"
              value={newOrder.weight}
              onChange={handleInputChange}
              type="number"
              name="weight"
            />
            <label className="text-left w-full text-sm">{content.price}</label>
            <input
              placeholder={content.price}
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
                {content.choose_type}
              </option>
              <option value={'صباغة'}>صباغة</option>
              <option value={'تنظيف'}>تنظيف</option>
            </select>
            <input
              placeholder={content.color}
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
              placeholder={content.notes}
              name="notes"
              value={newOrder.notes}
              onChange={handleInputChange}
            ></textarea>
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              {content.create}
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
  )
}

export default CreateOrder
