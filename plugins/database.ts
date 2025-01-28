// import * as Nano  from 'nano'

export default defineNuxtPlugin(async () => {
    // const config = useRuntimeConfig();

    // const nano = Nano({ url: config.couchdb?.url });
    // const username = config.couchdb?.username;
    // const password = config.couchdb?.password;
    // const dbName = config.couchdb?.database

    // if (username && password) {
    //     nano.auth(username, password);
    // }

    // try {
    //     await nano.db.get(dbName);
    // } catch (error: any) {
    //     if (error.statusCode === 404) {
    //         await nano.db.create(dbName);
    //     } else {
    //         throw error;
    //     }
    // }

    // console.debug({ message: `Database '${dbName}' is ready.` })

    return {
        provide: {
            couchdb: {},
        },
    };
});
