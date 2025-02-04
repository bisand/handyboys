import { useFetch } from 'nuxt/app'

export default defineEventHandler(async (event) => {
  console.log('event', event)

  const body = await readBody(event)

  const data = fetch('https://api.web3forms.com/submit', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, World!',
    }),
  }
})
