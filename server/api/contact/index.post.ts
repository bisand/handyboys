import { useDatabase } from '~/composables/database'

export default defineEventHandler(async (event) => {

  // Use readMultipartFormData to parse both form fields and file uploads
  const parts = await readMultipartFormData(event)

  const couchDb = useDatabase()

  // Separate text fields and files
  const fields: Record<string, string> = {}
  const files: any[] = []

  parts?.forEach((part: any) => {
    // ...existing code...
    if (part.filename !== undefined) {
      // This is a file field
      files.push(part)
    } else {
      // This is a regular field
      fields[part.name] = part.data?.toString('utf8')
    }
  })

  // Save the form data to CouchDB
  let resCouchDb
  try {
    resCouchDb = await couchDb.create({
      doc_type_: 'contact',
      ...fields,
    })
  } catch (e: any) {
    console.error(e)
  }

  if (resCouchDb && resCouchDb.id) {
    for (const file of files) {
      // ...existing code...
      console.log(file)
      const attachment = {
        name: file.filename,
        contentType: file.contentType,
        data: file.data,
      }
      try {
        resCouchDb = await couchDb.uploadAttachment(resCouchDb.id, resCouchDb.rev, attachment)
      } catch (e: any) {
        console.error(e)
      }
      console.log(resCouchDb)
    }
  }

  fields.access_key = process.env.WEB3FORMS_ACCESS_KEY as string
  fields.from_name = fields.name
  fields.replyto = fields.email
  fields.subject = `Ny melding fra ${fields.name}`

  const data: { status: number, statusText: string } = await $fetch('https://api.web3forms.com/submit', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(fields),
  })

  return {
    status: data.status,
    body: JSON.stringify({
      message: data.statusText,
    }),
  }

  // return {
  //   status: 200,
  //   body: JSON.stringify({
  //     message: 'Success',
  //   }),
  // }
})
