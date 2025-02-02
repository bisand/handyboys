import { useDatabase } from '~/composables/database'

export class HttpError extends Error {
  status: number
  constructor(message: string | undefined, statusCode: number) {
    super(message)
    this.status = statusCode
  }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const database = config.couchdb.database // Fetch from `.env` for security

  const db = useDatabase()
  try {
    const result = await db.getDb(database)
    console.log({ result })
    if (result.error && result.error === 'not_found') {
      throw new HttpError('Database not found', 404)
    }
  }
  catch (error: any) {
    if (error.status === 404) {
      try {
        await db.createDb(database)
      }
      catch (error: any) {
        console.error(error)
        throw error
      }
    }
  }

  const docs = await db.getAll()
  console.log({ docs })

  return docs
})
