import { useDatabase } from '~/composables/database';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const database = config.couchdb.database; // Fetch from `.env` for security

  const db = useDatabase(database);
  const docs = await db.list();
  console.log({ docs });

  return docs;
});
