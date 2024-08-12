import { useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import channels from '@shared/constants/channels'
import { PageHeader } from '@renderer/components/pageHeader'
import Breadcrumps from '@renderer/components/Breadcrumps/Breadcrumps'

const EditClient = (): JSX.Element => {
  const { id } = useParams()
  const location = useLocation()

  const navigate = useNavigate()
  const api = useContext(AppContext)
  const chn = channels

  const [newName, setNewName] = useState<string>(location?.state?.name)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.target.value)
  }
  const handleSubmit = async (): Promise<void> => {
    if (api) {
      await api.send(chn.UpdateClientRequest, { clientId: id, newName })
      await api.send(chn.ClientsListRequest)
      navigate('/client/list')
    }
  }

  return (
    <>
      <div className="p-6">
        <Breadcrumps path="/client/list">Back to list</Breadcrumps>

        <PageHeader>
          <h1 className="dark:text-white">Update Client</h1>
        </PageHeader>

        <div className="page-content p-6 bg-white  dark:bg-slate-950 rounded-md">
          <div className="flex justify-between items-center">
            <input
              placeholder="Type client name"
              className="input input-bordered w-full max-w-xs"
              value={newName}
              onChange={handleChange}
              type="text"
              name="name"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditClient
