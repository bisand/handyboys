export const useDatabase = () => {

    const config = useRuntimeConfig()
    if (!config.couchdb) {
        return null
    }
    const baseUrl = config.couchdb.url // Replace with your CouchDB URL
    const dbName = config.couchdb.database // Replace with your CouchDB database name
    const username = config.couchdb.username // Replace with your CouchDB username
    const password = config.couchdb.password // Replace with your CouchDB password

    const auth = 'Basic ' + btoa(`${username}:${password}`)

    const getAllDb = async () => {
        const response = await fetch(`${baseUrl}/_all_dbs`, {
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    const getDb = async (name: string) => {
        const response = await fetch(`${baseUrl}/${name}`, {
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    const createDb = async () => {
        const response = await fetch(`${baseUrl}/${dbName}`, {
            method: 'PUT',
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    const getAll = async () => {
        const response = await fetch(`${baseUrl}/${dbName}/_all_docs?include_docs=true`, {
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    const find = async (docType: string): Promise<any> => {
        const response = await fetch(`${baseUrl}/${dbName}/_find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({
                selector: {
                    doc_type_: docType
                }
            })
        })
        return response.json()
    }

    const getOne = async (id: string) => {
        const response = await fetch(`${baseUrl}/${dbName}/${id}`, {
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    const create = async (doc: any) => {
        const response = await fetch(`${baseUrl}/${dbName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify(doc)
        })
        return response.json()
    }

    const update = async (id: string, doc: any) => {
        const existing = await getOne(id)
        const response = await fetch(`${baseUrl}/${dbName}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: JSON.stringify({ ...doc, _rev: existing._rev })
        })
        return response.json()
    }

    const del = async (id: string, rev: string) => {
        const response = await fetch(`${baseUrl}/${dbName}/${id}?rev=${rev}`, {
            method: 'DELETE',
            headers: {
                'Authorization': auth
            }
        })
        return response.json()
    }

    return {
        getAllDb,
        getDb,
        createDb,
        getAll,
        getOne,
        create,
        update,
        delete: del,
        find
    } as any
}

function nameOf(object: Object): string {
    return object.constructor.name;
}