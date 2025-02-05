import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {

  // Use readMultipartFormData to parse both form fields and file uploads
  const parts = await readMultipartFormData(event);

  // Separate text fields and files
  const fields: Record<string, string> = {};
  const files: any[] = [];

  parts?.forEach((part: any) => {
    if ('data' in part) {
      // This is a file field
      files.push(part);
    } else {
      // This is a regular field
      fields[part.field] = part.value;
    }
  });

  // Map fields as needed
  fields.from_name = fields.name;
  fields.replyto = fields.email;

  // delete body.images

  const data = await fetch('https://api.web3forms.com/submit', {
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
})
