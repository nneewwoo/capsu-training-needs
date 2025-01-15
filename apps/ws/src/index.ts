import Bun, { type ServerWebSocket } from 'bun'
import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const { websocket, upgradeWebSocket } = createBunWebSocket<ServerWebSocket>()

const app = new Hono()

app.use('*', logger())

app.use(
  '*',
  cors({
    origin:
      Bun.env.NODE_ENV === 'production'
        ? [Bun.env.ANDROID_HOST as string, Bun.env.WEB_HOST as string]
        : '*',
    allowMethods: ['POST'],
    maxAge: 3600
  })
)

app.post('/auth/v1/callback', async ({ req }) => {
  const { refresh_token, access_token } = await req.json()

  server.publish(
    'onauthrequest',
    JSON.stringify({ refresh_token, access_token })
  )

  console.log({ refresh_token, access_token })
})

app.get(
  '/auth/v1/callback/ws',
  upgradeWebSocket(() => ({
    onOpen: (_, ws) => {
      const rawWs = ws.raw as unknown as ServerWebSocket
      rawWs.subscribe('onauthrequest')
    },
    onClose: (_, ws) => {
      const rawWs = ws.raw as unknown as ServerWebSocket
      rawWs.unsubscribe('onauthrequest')
    }
  }))
)

app.onError((err, { json }) => {
  return json({
    error: {
      message: err.message,
      stack: err.stack,
      cause: err.cause
    }
  })
})

const server = Bun.serve({
  fetch: async (req, server) => {
    return await app.fetch(req, { ip: server.requestIP(req), server })
  },
  websocket,
  ...(Bun.env.NODE_ENV === 'development' && {
    hostname: '0.0.0.0',
    port: 14146
  })
})

console.log(`Server is running on ${server.hostname}, port ${server.port}`)

export { server }
