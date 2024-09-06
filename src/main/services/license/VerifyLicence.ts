import channels from '@shared/constants/channels'
import { ValidateLicenceKeyLocal } from '../../utils/MacAddressLicence'
import { ValidateLicenceKeyOnline } from './OnlineLicense'

export const VerifyLicense = async (event: Electron.IpcMainEvent): Promise<void> => {
  if (import.meta.env.VITE_LICENSE_METHOD !== 'OPEN') {
    let isValidated: boolean
    // const isValidated = await ValidateLicenceKey()
    switch (import.meta.env.VITE_LICENSE_METHOD) {
      case 'MAC_ADDRESS':
        isValidated = await ValidateLicenceKeyLocal()
        break
      case 'ONLINE':
        isValidated = await ValidateLicenceKeyOnline()
        break
    }
    if (!isValidated) {
      event.reply(channels.LicenseVerifyResponse, false) // Set TRUE for permanent validation
    } else {
      event.reply(channels.LicenseVerifyResponse, true)
    }
  } else {
    event.reply(channels.LicenseVerifyResponse, true)
  }
}
