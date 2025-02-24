import { useDatabase } from '~/composables/database'

export default defineEventHandler(async (event) => {
  const db = useDatabase()

  const docs = await db.getContactItems('todo')
  return docs
})
