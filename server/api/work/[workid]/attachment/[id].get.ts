import { useDatabase } from '~/composables/database'

export default defineEventHandler(async (event) => {
  const db = useDatabase()
  const id = getRouterParam(event, 'workid')
  const attachmentId = getRouterParam(event, 'id')
  const docs = await db.getAttachment(id, attachmentId)
  return docs
})
