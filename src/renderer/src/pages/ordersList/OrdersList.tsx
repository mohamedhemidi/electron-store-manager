import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import PrinterIcon from '../../assets/icons/printer.svg'
import moment from 'moment'
import channels from '@shared/constants/channels'
import { PageHeader } from '@renderer/components/pageHeader'
import TableSection from '@renderer/components/TableSection/TableSection'
import getTranslation from '@renderer/utils/getTranslation'
import IOrderResponse from '@shared/types/OrderResponse'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner'
import Pagination from '@renderer/components/Pagination/Pagination'

const OrdersList = (): JSX.Element => {
  const navigate = useNavigate()
  const api = useContext(AppContext)
  const chn = channels

  const location = useLocation()

  const content = getTranslation()

  const [id, setId] = useState<string>()
  const [response, setResponse] = useState<IOrderResponse | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit] = useState<number>(3)
  const [loading, setLoading] = useState<boolean>(false)

  const [note, setNote] = useState<string>('')

  const fetchOrdersList = (): void => {
    if (api) {
      if (location.state) {
        api.send(chn.ClientOrdersListRequest, { id: location.state, page: currentPage, limit })
        api.receive(chn.ClientOrdersListReceive, (data: IOrderResponse) => {
          setResponse(data)
          setLoading(false)
        })
      } else {
        api.send(chn.OrdersListRequest, { page: currentPage, limit })
        api.receive(chn.OrdersListReceive, (data: IOrderResponse) => {
          setResponse(data)
          setLoading(false)
        })
      }
    }
  }

  const deleteOrder = async (): Promise<void> => {
    if (api) {
      api.send(chn.DeleteOrderRequest, id)
      await api.send(chn.OrdersListRequest)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchOrdersList()
  }, [currentPage])

  const handleGeneratePDF = (c): void => {
    api.send(channels.PrintTiquetPdf, {
      id: c.id,
      name: c.client_name,
      price: c.price,
      createdAt: c.createdAt,
      dueDate: c.dueDate,
      generatedAt: 'string'
    })
  }

  const handleSetPage = (data: number): void => {
    setCurrentPage(data)
  }
  return (
    <>
      <div className="p-6">
        <PageHeader>
          <h1 className="dark:text-white">{content.orders_list}</h1>
          <button
            onClick={() => navigate('/order/create')}
            className="btn btn-success text-white font-semibold"
          >
            + {content.create_order}
          </button>
        </PageHeader>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-white dark:bg-slate-950 rounded-md">
              <TableSection
                Header={
                  <tr>
                    <th></th>
                    <th>{content.client_name}</th>
                    <th>{content.weight}</th>
                    <th>{content.price}</th>
                    <th>{content.color}</th>
                    <th>{content.type} </th>
                    <th>{content.due_date}</th>
                    <th>{content.notes}</th>
                    <th>{content.created_at}</th>
                    <th>{content.actions}</th>
                    <th>PDF</th>
                  </tr>
                }
                Body={
                  <>
                    {response && response.data ? (
                      response.data.map((c, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
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
                              <p className="w-36">
                                {moment(c.createdAt).format('DD/MM/YYYY h:mmA')}
                              </p>
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
                            <td>
                              <button
                                className="btn btn-circle"
                                onClick={() => handleGeneratePDF(c)}
                              >
                                <img src={PrinterIcon} className="h-6 w-6" />
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <span>{content.no_orders_found}</span>
                    )}
                  </>
                }
              />
            </div>
            {response && response.pageCount ? (
              <Pagination pageCount={response.pageCount} onSetPage={handleSetPage} />
            ) : null}
          </div>
        )}

        {/* Delete Order Modal */}
        <dialog className="modal" id="delete_modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{content.delete_order}</h3>
            <p className="py-4">{content.confirm_order_deletion_prompt}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => deleteOrder()}>
                  {content.delete}
                </button>
              </form>
            </div>
          </div>
        </dialog>
        {/* Notes Modal */}
        <dialog id="note_modal" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{content.notes}</h3>
            <p className="py-4">{note}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => setNote('')}>
                  {content.close}
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default OrdersList
