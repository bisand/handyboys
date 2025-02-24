import { useDatabase } from '~/composables/database'

export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const id = getRouterParam(event, 'workid')

  const docs = await db.getOne(id)
  return docs
})
