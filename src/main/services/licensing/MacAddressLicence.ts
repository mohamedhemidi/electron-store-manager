import os from 'os'
import crypto from 'crypto'

export const verifyLicence = (): boolean => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048
  })

  const signature = crypto.sign('sha256', Buffer.from('mohamed@gmail.com'), {
    key: privateKey
  })

  signature.toString('base64')

  const isVerfied = crypto.verify(
    'sha256',
    Buffer.from('mohamed@gmail.com'),
    {
      key: publicKey
    },
    signature
  )
  return isVerfied
}

export const getMacAddress_WindowsOS = (): string | null => {
  const interfaces = os.networkInterfaces()
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
    if (macAddress) break
  }

  return macAddress
}

export const getMacAddress_MacOS = (): string | null => {
  const networkInterfaces = os.networkInterfaces()
  const ethernetInterfaceNames = ['eth', 'en', 'Ethernet'] // Possible prefixes for Ethernet interfaces

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName]
    if (networkInterface) {
      for (const net of networkInterface) {
        // Check for a non-internal IPv4 address
        if (net.family === 'IPv4' && !net.internal) {
          // Match Ethernet interfaces by name
          if (ethernetInterfaceNames.some((prefix) => interfaceName.startsWith(prefix))) {
            return net.mac
          }
        }
      }
    }
  }

  return null // Return null if no Ethernet MAC address is found
}
