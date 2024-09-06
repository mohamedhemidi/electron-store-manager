import { setupDatabase } from '../config/DBconfig'
import { v4 as uuidv4 } from 'uuid'
const db = setupDatabase()

export const ValidateLicenceKeyOnline = async (): Promise<boolean> => {
  // Check on Remote DB if License for that user does exists
  // If not return False
  // If a license exists with user's email verify it against stored license
  return false
}

export const PromptLicenseKeyOnline = async (licenseKey: string): Promise<boolean> => {
  const isValid = false // Online Checking License =>
  if (isValid) {
    // Store it in DB or Secure Storage Or Online to Remote DB

    // Local SqliteDB:
    const storeLicenseQuery = `INSERT INTO licenses (id, license_key, createdAt, updatedAt) VALUES (?, ?, ?, ?)`

    const stmt = await db.prepare(storeLicenseQuery)
    await stmt.run(uuidv4(), licenseKey, new Date().toISOString(), new Date().toISOString())

    // Local FS storage file:
    // fs.writeFileSync(licenseFilePath, encrypt(licenseKey))

    // Remote DB Online:
    // TODO:)
    return true
  } else {
    // Return false to quit the app
    return false
  }
}
