export default defineEventHandler(async (event) => {

  // Use readMultipartFormData to parse both form fields and file uploads
  const parts = await readMultipartFormData(event);

  // Separate text fields and files
  const fields: Record<string, string> = {};
  const files: any[] = [];

  parts?.forEach((part: any) => {
    // ...existing code...
    if (part.filename) {
      // This is a file field
      files.push(part);
    } else {
      // This is a regular field
      fields[part.name] = part.value;
    }
    // ...existing code...  });

    fields.access_key = process.env.WEB3FORMS_ACCESS_KEY as string;
    // Map fields as needed
    fields.from_name = fields.name;
    fields.replyto = fields.email;
    fields.subject = `Ny melding fra ${fields.name}`;

    // delete body.images

    // const data = await fetch('https://api.web3forms.com/submit', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(fields),
    // })

    // return {
    //   status: data.status,
    //   body: JSON.stringify({
    //     message: data.statusText,
    //   }),
    // }
  })

  return {
    status: 200,
    body: JSON.stringify({
      message: 'Success',
    }),
  }
})
