export const useDatabase = () => {

    type Document = {
        _id: string
        _rev: string
    } & Record<string, any>

    type DocumentCreateResponse = {
        id: string
        ok: boolean
        rev: string
    } & Record<string, any>

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
        const response = await $fetch(`${baseUrl}/_all_dbs`, {
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse
        })
        return response
    }

    const getDb = async (name: string) => {
        const response = await $fetch(`${baseUrl}/${name}`, {
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse
        })
        return response
    }

    const createDb = async () => {
        const response = await $fetch(`${baseUrl}/${dbName}`, {
            method: 'PUT',
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse
        })
        return response
    }

    const getAll = async () => {
        const response = await $fetch(`${baseUrl}/${dbName}/_all_docs?include_docs=true`, {
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse
        })
        return response
    }

    const find = async (docType: string): Promise<Document[]> => {
        const response = await $fetch(`${baseUrl}/${dbName}/_find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            parseResponse: JSON.parse,
            body: JSON.stringify({
                selector: {
                    doc_type_: docType
                }
            }
            )
        })
        return response
    }

    const getContactItems = async (status: string): Promise<Document[]> => {
        const response = await $fetch(`${baseUrl}/${dbName}/_find?attachments=false`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            parseResponse: JSON.parse,
            body: JSON.stringify({
                selector: {
                    doc_type_: 'contact',
                    status: status
                }
            }
            )
        })
        return response
    }

    const getOne = async (id: string): Promise<Document> => {
        const response = await $fetch(`${baseUrl}/${dbName}/${id}`, {
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse
        })
        return response as Document
    }

    const create = async (doc: Document): Promise<DocumentCreateResponse> => {
        const bodyData = JSON.stringify(doc)
        const response = await $fetch(`${baseUrl}/${dbName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            parseResponse: JSON.parse,
            body: bodyData
        })
        return response as DocumentCreateResponse
    }

    const update = async (id: string, doc: any): Promise<DocumentCreateResponse> => {
        const existing = await getOne(id)
        const response = await $fetch(`${baseUrl}/${dbName}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            parseResponse: JSON.parse,
            body: JSON.stringify({ ...doc, _rev: existing._rev })
        })
        return response as DocumentCreateResponse
    }

    const del = async (id: string, rev: string) => {
        const response = await $fetch(`${baseUrl}/${dbName}/${id}?rev=${rev}`, {
            method: 'DELETE',
            headers: {
                'Authorization': auth
            },
            parseResponse: JSON.parse,
        })
        return response
    }

    const uploadAttachment = async (id: string, rev: string, attachment: { name: string, contentType: string, data: any }): Promise<DocumentCreateResponse> => {
        const response = await $fetch(`${baseUrl}/${dbName}/${id}/${attachment.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': attachment.contentType,
                'Authorization': auth,
                'If-Match': rev
            },
            parseResponse: JSON.parse,
            body: attachment.data
        })
        return response as DocumentCreateResponse
    }

    const getAttachment = async (id: string, attachmentName: string): Promise<any> => {
        const response = await $fetch(`${baseUrl}/${dbName}/${id}/${attachmentName}`, {
            headers: {
                'Authorization': auth
            },
        })
        return response
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
        find,
        uploadAttachment,
        getContactItems,
        getAttachment
    } as any
}

function nameOf(object: Object): string {
    return object.constructor.name
}