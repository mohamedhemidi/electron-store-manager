import { PromptLicenseKeyLocal } from '../../utils/MacAddressLicence'
import { PromptLicenseKeyOnline } from '../../utils/OnlineLicense'
import channels from '@shared/constants/channels'
import { app } from 'electron/main'

export const PromptLicense = async (event, args): Promise<void> => {
  let validLicenseKey: boolean
  switch (import.meta.env.VITE_LICENSE_METHOD) {
    case 'MAC_ADDRESS':
      validLicenseKey = await PromptLicenseKeyLocal(args)
      break
    case 'ONLINE':
      validLicenseKey = await PromptLicenseKeyOnline(args)
      break
    case 'FREE':
      validLicenseKey = true
      break
  }
  if (validLicenseKey) {
    event.reply(channels.LicenseKeyResponse, { valideKey: true })
  } else {
    app.quit()
  }
}
