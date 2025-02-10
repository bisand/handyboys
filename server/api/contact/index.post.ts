import { useDatabase } from '~/composables/database'
import sharp from "sharp";
import heicConvert from "heic-convert";

export default defineEventHandler(async (event) => {

  type Web3FormsResponse = {
    data: Record<string, any>
    success: boolean
    message: string,
    workItemId: string
  }


  // Use readMultipartFormData to parse both form fields and file uploads
  const parts = await readMultipartFormData(event)

  const couchDb = useDatabase()

  // Separate text fields and files
  const fields: Record<string, string> = {}
  const files: any[] = []

  const getJpgFileName = (file: any) => {
    return file.filename.replace(/\.[^/.]+$/, ".jpg").replace(/\s+/g, "_");
  }

  const getJpgImage = async (file: any) => {
    let buffer = file.data;
    try {
      const filename = String(file.filename || "");
      if (filename.toLowerCase().endsWith(".heic")) {
        buffer = await heicConvert({
          buffer: file.data,
          format: "JPEG",
          quality: 0.50,
        });
        buffer = await sharp(buffer).resize({
          width: 1920,
          height: 1920,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        }).toBuffer();
      } else if (
        !filename.toLowerCase().endsWith(".jpg") &&
        !filename.toLowerCase().endsWith(".jpeg")
      ) {
        buffer = await sharp(file.data).resize({
          width: 1920,
          height: 1920,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        }).toFormat("jpeg", { quality: 50 }).toBuffer();
      }
    }
    catch (e: any) {
      console.error(e);
    }
    return buffer;
  }

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
      status: 'todo',
      ...fields,
    })
  } catch (e: any) {
    console.error(e)
  }

  if (resCouchDb && resCouchDb.id) {
    for (const file of files) {
      let jpgBuffer = await getJpgImage(file);
      const attachment = {
        name: getJpgFileName(file),
        contentType: 'image/jpeg',
        data: jpgBuffer,
      }
      try {
        resCouchDb = await couchDb.uploadAttachment(resCouchDb.id, resCouchDb.rev, attachment)
      } catch (e: any) {
        console.error(e)
      }
      console.log(resCouchDb.id, resCouchDb.rev)
    }
  }

  fields.work_link = `https://www.handyboys.no/work/${resCouchDb.id}`
  fields.access_key = process.env.WEB3FORMS_ACCESS_KEY as string
  fields.from_name = fields.name
  fields.replyto = fields.email
  fields.subject = `Ny melding fra ${fields.name}`

  try {
    const data: any = await $fetch('https://api.web3forms.com/submit', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      parseResponse: JSON.parse,
      body: JSON.stringify(fields),
    })

    data.workItemId = resCouchDb.id
    return {
      status: 200,
      body: data as Web3FormsResponse,
    }

  } catch (e: any) {
    console.error(e)
    return {
      status: 500,
      body: {
        message: 'Error',
      } as Web3FormsResponse,
    }

  }
})
