import faunadb from 'faunadb'

function account (res) {
  if (!res || !res.responseHeaders) return
  const h = res.responseHeaders
  console.log(h)
}

export const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_KEY,
  observer: account
})