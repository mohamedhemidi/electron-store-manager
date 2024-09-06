import { AppContext } from '@renderer/contexts/AppContext'
import channels from '@shared/constants/channels'
import { ILicenseResponse } from '@shared/types/LicenseRsponse'
import { useContext, useState } from 'react'

const LicenseKeyPrompt = (): JSX.Element => {
  const api = useContext(AppContext)
  const [licenseKey, setLicenseKey] = useState('')

  const handleSendLicenseKey = (): void => {
    if (api) {
      api.send(channels.LicenseKeyRequest, licenseKey)
      api.receive(channels.LicenseKeyResponse, (data: ILicenseResponse) => {
        if (data && data.valideKey === true) {
          window.location.reload()
        }
      })
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-8 w-4/5 justify-center items-center bg-white p-4 rounded-md">
        <label className="w-full text-center text-xl font-semibold">License Key</label>
        <input
          placeholder="Enter key here"
          className="input input-bordered w-full"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          type="text"
          name="license_key"
        />
        <button className="btn btn-primary" onClick={handleSendLicenseKey}>
          Activate
        </button>
      </div>
    </div>
  )
}

export default LicenseKeyPrompt
