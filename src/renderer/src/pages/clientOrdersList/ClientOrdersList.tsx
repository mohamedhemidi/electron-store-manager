import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import moment from 'moment'
import channels from '@shared/constants/channels'
import IOrder from '@renderer/types/Order'
import { PageHeader } from '@renderer/components/pageHeader'
import TableSection from '@renderer/components/TableSection/TableSection'

const ClientOrdersList = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()

  const api = useContext(AppContext)
  const chn = channels

  const [orders, setOrders] = useState<IOrder[] | null>(null)
  const [note, setNote] = useState<string>('')
  const [id, setId] = useState<string>()

  const fetchOrdersList = (): void => {
    if (api) {
      api.send(chn.ClientOrdersListRequest, { id: location.state })
      api.receive(chn.ClientOrdersListReceive, (data: IOrder[]) => {
        setOrders(data)
      })
    }
  }

  const deleteOrder = async (): Promise<void> => {
    if (api) {
      api.send(chn.DeleteOrderRequest, id)
      await api.send(chn.OrdersListRequest)
    }
  }
  useEffect(() => {
    fetchOrdersList()
  }, [])

  return (
    <>
      <div className="p-6">
        <PageHeader>
          <h1 className="dark:text-white">Orders List</h1>
          <button
            onClick={() => navigate('/order/create')}
            className="btn btn-success text-white font-semibold"
          >
            + Create Order
          </button>
        </PageHeader>
        <div className="p-6 bg-white  dark:bg-slate-950 rounded-md">
          <TableSection
            Header={
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
            }
            Body={
              <>
                {orders &&
                  orders.length &&
                  orders.map((c, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{c.client_name}</td>
                        <td>{c.weight}</td>
                        <td>{c.price}</td>
                        <td>{c.color}</td>
                        <td>{c.type}</td>
                        <td>
                          <p className="w-44">{moment(c.dueDate).format('DD/MM/YYYY h:mmA')}</p>
                        </td>
                        <td>
                          <a
                            className="cursor-pointer"
                            onClick={() => {
                              if (document) {
                                ;(
                                  document.getElementById('note_modal') as HTMLFormElement
                                ).showModal()
                              }
                              setNote(c.notes)
                            }}
                          >
                            <p className="w-44">{c.notes.substring(0, 25)}</p>
                          </a>
                        </td>
                        <td>
                          <p className="w-36">{moment(c.createdAt).format('DD/MM/YYYY h:mmA')}</p>
                        </td>
                        <td className="flex gap-2 items-center">
                          <button
                            className="btn btn-circle"
                            onClick={() => navigate(`/order/edit/${c.id}`, { state: c })}
                          >
                            <img src={EditIcon} className="h-6 w-6" />
                          </button>
                          <button className="btn btn-circle">
                            <a
                              onClick={() => {
                                if (document) {
                                  ;(
                                    document.getElementById('delete_modal') as HTMLFormElement
                                  ).showModal()
                                }
                                setId(c.id)
                              }}
                            >
                              <img src={DeleteIcon} className="h-6 w-6" />
                            </a>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </>
            }
          />
        </div>

        {/* Delete Order Modal */}
        <dialog className="modal" id="delete_modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Order</h3>
            <p className="py-4">Please confirm deleting the order by clicking the button below</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => deleteOrder()}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>
        {/* Notes Modal */}
        <dialog id="note_modal" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Note</h3>
            <p className="py-4">{note}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setNote('')}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default ClientOrdersList
