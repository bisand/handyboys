export const useDatabase = (dbName: string) => {
  const { $couchdb } = useNuxtApp();
  return $couchdb.db.use(dbName);
};
