import { useNavigate } from 'react-router-dom'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import moment from 'moment'
import channels from '@shared/constants/channels'
import { PageHeader } from '@renderer/components/pageHeader'
import TableSection from '@renderer/components/TableSection/TableSection'
import getTranslation from '@renderer/utils/getTranslation'
import IClientResponse from '@shared/types/ClientsResponse'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner'
import Pagination from '@renderer/components/Pagination/Pagination'

const ClientsList = (): ReactElement => {
  const navigate = useNavigate()
  const api = useContext(AppContext)
  const chn = channels

  const content = getTranslation()

  const [id, setId] = useState<string>()
  const [response, setResponse] = useState<IClientResponse | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit] = useState<number>(25)
  const [loading, setLoading] = useState<boolean>(false)

  const [searchValue, setSearchValue] = useState<string>('')

  const fetchClientsList = (searchValue?: string): void => {
    if (api) {
      api.send(chn.ClientsListRequest, { page: currentPage, limit, searchValue })
      api.receive(chn.ClientsListReceive, (data: IClientResponse) => {
        setResponse(data)
        setLoading(false)
      })
    }
  }

  const deleteClient = async (): Promise<void> => {
    if (api) {
      api.send(chn.DeleteClientRequest, id)
      await api.send(chn.ClientsListRequest)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchClientsList()
  }, [currentPage])

  const handleSetPage = (data: number): void => {
    setCurrentPage(data)
  }
  const handleSearch = (): void => {
    fetchClientsList(searchValue)
  }

  return (
    <>
      <div className="p-6">
        <PageHeader>
          <h1 className="dark:text-white">{content.clients_list}</h1>
          <button
            onClick={() => navigate('/client/create')}
            className="btn btn-success text-white font-semibold"
          >
            + {content.create_client}
          </button>
        </PageHeader>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center p-6 bg-white dark:bg-slate-950 rounded-md">
              <input
                placeholder={content.type_client_name}
                className="input input-bordered w-full max-w-xs"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                name="searchValue"
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                {content.search}
              </button>
            </div>
            <div className="p-6 bg-white  dark:bg-slate-950 rounded-md">
              <TableSection
                Header={
                  <tr>
                    <th></th>
                    <th>{content.name}</th>
                    <th>{content.created_at}</th>
                    <th>{content.actions}</th>
                  </tr>
                }
                Body={
                  <>
                    {response && response.data ? (
                      response.data.map((c, index) => {
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
                              <p className="w-36">
                                {moment(c.createdAt).format('DD/MM/YYYY h:mmA')}
                              </p>
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
                      })
                    ) : (
                      <span>{content.no_clients_found}</span>
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

        {/* Delete Client Modal */}
        <dialog className="modal" id="delete_modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{content.delete_client}</h3>
            <p className="py-4">{content.confirm_client_deletion_prompt}</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => deleteClient()}>
                  {content.delete}
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
