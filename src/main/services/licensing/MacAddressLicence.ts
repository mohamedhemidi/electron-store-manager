import os from 'os'
import crypto from 'crypto'
import { app, dialog } from 'electron'

interface IMacAddress {
  providedAddress: string
  currentAddress: string
}

export const checkLicenseKey = (): void => {
  // Get Licence Key from Storage
  // const licenseKey = store.get('licenseKey') as string
  const licenseKey = null // Get Licence Key from Storage
  if (!licenseKey) {
    promptForLicenseKey()
  } else {
    validateLicenseKey(licenseKey)
  }
}

/*
/*
/ Generate a License key using the user's MAC address and a private secret key
/*
/** */

export const generateLicenseKey = (macAddress, secretKey): string => {
  const hash = crypto.createHmac('sha256', secretKey).update(macAddress).digest('hex')
  return hash
}

/*
/*
/ Get MAC Address from current machine and from ENV file
/*
/** */
export const Get_MAC_ADDRESS = (): IMacAddress | null => {
  const MacAddresses = {
    providedAddress: '',
    currentAddress: ''
  }
  const interfaces = os.networkInterfaces()
  if (process.platform === 'darwin') {
    MacAddresses.providedAddress = process.env['VITE_MAC_ADDRESS_MACOS']!
    const ethernetInterfaceNames = ['eth', 'en', 'Ethernet']
    for (const interfaceName in interfaces) {
      const networkInterface = interfaces[interfaceName]
      if (networkInterface) {
        for (const net of networkInterface) {
          if (net.family === 'IPv4' && !net.internal) {
            if (ethernetInterfaceNames.some((prefix) => interfaceName.startsWith(prefix))) {
              MacAddresses.currentAddress = net.mac
            }
          }
        }
      }
    }
    return MacAddresses
  }
  if (process.platform === 'win32') {
    MacAddresses.providedAddress = process.env['VITE_MAC_ADDRESS_WINDOWS']!
    let macAddress: string | null = null

    for (const interfaceName in interfaces) {
      const iface = interfaces[interfaceName]
      if (iface) {
        for (const alias of iface) {
          if (alias.family === 'IPv4' && !alias.internal) {
            macAddress = alias.mac
            break
          }
        }
      }
      if (macAddress) {
        MacAddresses.currentAddress = macAddress
        break
      }
    }

    return MacAddresses
  }
  return null
}

/*
/*
/ Prompt the user for entering a Licence key if not exists in the storage
/*
/** */

const promptForLicenseKey = (): void => {
  // const licenseKey = dialog.showMessageBoxSync({
  //   message: 'Please enter your license key:',
  //   title: 'License Key Required'
  // })
  const licenseKey = ''

  if (licenseKey) {
    const isValid = validateLicenseKey(licenseKey)
    if (isValid) {
      // store.set('licenseKey', licenseKey)
    } else {
      dialog.showErrorBox(
        'Invalid License Key',
        'The license key you entered is invalid. The application will now exit.'
      )
      app.quit()
    }
  } else {
    app.quit()
  }
}

/*
/*
/ Validate and compare the Entered License Key if it matches a generated key
/ using current machine MAC address
/*
/** */

const validateLicenseKey = (licenseKey: string): boolean => {
  const getMacAddresses = Get_MAC_ADDRESS()
  const secretKey = process.env['VITE_LICENCE_KEY_SECRET']

  const expectedKey = generateLicenseKey(getMacAddresses?.currentAddress, secretKey)

  return expectedKey === licenseKey
}
