import { useDatabase } from '~/composables/database';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const database = config.couchdb.database; // Fetch from `.env` for security

  const db = await useDatabase();
  const docs = db?.info();
  console.log({ docs });

  return docs;
});
