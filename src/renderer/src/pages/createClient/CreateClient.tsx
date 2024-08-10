import { ReactElement, useContext, useState } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import channels from '@shared/constants/channels'

const CreateClient = (): ReactElement => {
  const api = useContext(AppContext)

  const navigate = useNavigate()

  const chn = channels

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
        <div
          className="breadcrumbs mb-2 flex flex-row items-center cursor-pointer"
          onClick={() => navigate('/client/list')}
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
          <h1>Create Client</h1>
        </div>

        <div className="page-content p-6 bg-white rounded-md">
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
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateClient
