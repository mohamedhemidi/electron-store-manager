import { ReactElement, useContext, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import channels from '@shared/constants/channels'
import { PageHeader } from '@renderer/components/pageHeader'
import Breadcrumps from '@renderer/components/Breadcrumps/Breadcrumps'
import getTranslation from '@renderer/utils/getTranslation'

const CreateClient = (): ReactElement => {
  const api = useContext(AppContext)

  const navigate = useNavigate()

  const chn = channels

  const content = getTranslation()

  const [name, setName] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }
  const handleSubmit = async (): Promise<void> => {
    if (api) {
      await api.send(chn.CreateClientRequest, name)
      await api.send(chn.ClientsListRequest, 'parameters')
      navigate('/client/list')
    }
  }

  return (
    <>
      <div className="p-6">
        <Breadcrumps path="/client/list">{content.back_to_list}</Breadcrumps>

        <PageHeader>
          <h1 className="dark:text-white">{content.create_client}</h1>
        </PageHeader>

        <div className="page-content p-6 bg-white  dark:bg-slate-950 rounded-md">
          <div className="flex justify-between items-center">
            <input
              placeholder="Type client name"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              {content.create}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateClient
