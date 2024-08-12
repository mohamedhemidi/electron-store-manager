import { useNavigate } from 'react-router-dom'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import moment from 'moment'
import channels from '@shared/constants/channels'
import { PageHeader } from '@renderer/components/pageHeader'
import TableSection from '@renderer/components/TableSection/TableSection'
const ClientsList = (): ReactElement => {
  const navigate = useNavigate()
  const api = useContext(AppContext)
  const chn = channels

  const [id, setId] = useState<string>()
  const [clients, setClients] = useState<
    | {
        createdAt: string
        id: string
        name: string
      }[]
    | null
  >(null)

  const fetchClientsList = (): void => {
    if (api) {
      api.send(chn.ClientsListRequest, 'parameters')
      api.receive(
        chn.ClientsListReceive,
        (data: { id: string; name: string; createdAt: string }[]) => {
          setClients(data)
        }
      )
    }
  }

  const deleteClient = async (): Promise<void> => {
    if (api) {
      api.send(chn.DeleteClientRequest, id)
      await api.send(chn.ClientsListRequest)
    }
  }

  useEffect(() => {
    fetchClientsList()
  }, [])

  return (
    <>
      <div className="p-6">
        <PageHeader>
          <h1 className="dark:text-white">Clients List</h1>
          <button
            onClick={() => navigate('/client/create')}
            className="btn btn-success text-white font-semibold"
          >
            + Create Client
          </button>
        </PageHeader>
        <div className="p-6 bg-white  dark:bg-slate-950 rounded-md">
          <TableSection
            Header={
              <tr>
                <th></th>
                <th>Name</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            }
            Body={
              <>
                {clients &&
                  clients.map((c, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          <a
                            className="cursor-pointer"
                            onClick={() => navigate('/client/order/list', { state: c.id })}
                          >
                            {c.name}
                          </a>
                        </td>
                        <td>
                          <p className="w-36">{moment(c.createdAt).format('DD/MM/YYYY h:mmA')}</p>
                        </td>
                        <td className="flex gap-2 items-center">
                          <button
                            className="btn btn-circle"
                            onClick={() => navigate(`/client/edit/${c.id}`, { state: c })}
                          >
                            <img src={EditIcon} className="h-6 -w-6" />
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

        {/* Delete Client Modal */}
        <dialog className="modal" id="delete_modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Client</h3>
            <p className="py-4">Please confirm deleting the client by clicking the button below</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => deleteClient()}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}

export default ClientsList
