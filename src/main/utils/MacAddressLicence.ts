import os from 'os'
import crypto from 'crypto'
import { setupDatabase } from '../config/DBconfig'
import { v4 as uuidv4 } from 'uuid'

interface IMacAddress {
  providedAddress: string
  currentAddress: string
}
const db = setupDatabase()

// FS Local Storage :
//
// const algorithm = 'aes-256-cbc'
// const key = crypto.scryptSync('secret-key', 'salt', 32)
// const iv = crypto.randomBytes(16)
// const licenseFilePath = path.join(app.getPath('documents'), 'license.dat')

// function encrypt(text): string {
//   const cipher = crypto.createCipheriv(algorithm, key, iv)
//   let encrypted = cipher.update(text, 'utf8', 'hex')
//   encrypted += cipher.final('hex')
//   return iv.toString('hex') + ':' + encrypted
// }

// function decrypt(encrypted): string {
//   const [iv, content] = encrypted.split(':')
//   const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'))
//   let decrypted = decipher.update(content, 'hex', 'utf8')
//   decrypted += decipher.final('utf8')
//   return decrypted
// }

export const ValidateLicenceKeyLocal = async (): Promise<boolean> => {
  // Check if License Key exists in DB

  const getLicenseQuery = `SELECT * FROM licenses`

  const getLicenseStmt = db.prepare(getLicenseQuery)
  const result = getLicenseStmt.get()
  const licenseKey = result ? result.license_key : ''

  // const licenseKey = decrypt(fs.readFileSync(licenseFilePath, 'utf8'))

  if (!licenseKey || licenseKey === undefined) {
    return false
  } else {
    // Check if Existing License Key is valid against current MAC Address
    const isValid = await verifyLicenseKey(licenseKey)
    if (isValid) {
      return true
    } else {
      return false
    }
  }
}

export const PromptLicenseKeyLocal = async (licenseKey: string): Promise<boolean> => {
  const isValid = await verifyLicenseKey(licenseKey)
  if (isValid) {
    // Store it in DB or Secure Storage Or Online to Remote DB

    // Local SqliteDB:
    const storeLicenseQuery = `INSERT INTO licenses (id, license_key, createdAt, updatedAt) VALUES (?, ?, ?, ?)`

    const stmt = await db.prepare(storeLicenseQuery)
    await stmt.run(uuidv4(), licenseKey, new Date().toISOString(), new Date().toISOString())

    // Local FS storage file:
    // fs.writeFileSync(licenseFilePath, encrypt(licenseKey))
    return true
  } else {
    // Return false to quit the app
    return false
  }
}

/*
/*
/ Generate a License key using the user's MAC address and a private secret key
/*
/** */

export const generateLicenseKey = (macAddress: string, secretKey: string): string => {
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
    providedAddress: import.meta.env.VITE_MAC_ADDRESS,
    currentAddress: ''
  }
  const interfaces = os.networkInterfaces()
  if (process.platform === 'darwin') {
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
/ Verify and compare the Entered License Key if it matches a generated key
/ using current machine MAC address
/*
/** */

export const verifyLicenseKey = async (licenseKey: string): Promise<boolean> => {
  const getMacAddresses = Get_MAC_ADDRESS()
  const secretKey = import.meta.env.VITE_LICENSE_KEY_SECRET

  if (getMacAddresses && getMacAddresses?.currentAddress) {
    const expectedKey = generateLicenseKey(getMacAddresses?.currentAddress, secretKey)
    return expectedKey === licenseKey
  } else {
    return false
  }
}
