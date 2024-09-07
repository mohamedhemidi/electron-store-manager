import channels from '@shared/constants/channels'
import { ValidateLicenceKeyLocal } from '../../utils/MacAddressLicence'
import { ValidateLicenceKeyOnline } from '../../utils/OnlineLicense'

export const VerifyLicense = async (event: Electron.IpcMainEvent): Promise<void> => {
  if (import.meta.env.VITE_LICENSE_METHOD !== 'FREE') {
    let isValidated: boolean
    switch (import.meta.env.VITE_LICENSE_METHOD) {
      case 'MAC_ADDRESS':
        isValidated = await ValidateLicenceKeyLocal()
        break
      case 'ONLINE':
        isValidated = await ValidateLicenceKeyOnline()
        break
    }
    if (!isValidated) {
      event.reply(channels.LICENSE_VERIFY_RESPONSE, false)
    } else {
      event.reply(channels.LICENSE_VERIFY_RESPONSE, true)
    }
  } else {
    event.reply(channels.LICENSE_VERIFY_RESPONSE, true)
  }
}
