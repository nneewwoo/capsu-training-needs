import { type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const handleAuth: Handle = async ({ event, resolve }) => {
  // TODO: Implement authentication

  return await resolve(event)
}

const allowedOrigins = [
  'http://tauri.localhost',
  'https://capsu-training-needs.tech'
]

const corsHeaders = {
  'Access-Control-Allow-Origin': '',
  'Access-Control-Max-Age': '3600',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE',
  'Access-Control-Allow-Headers':
    'Authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}

const handleCors: Handle = async ({ event, resolve }) => {
  const origin = event.request.headers.get('Origin')

  if (origin && allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin
  }

  if (event.request.method !== 'OPTIONS') {
    const response = await resolve(event)
    for (const [key, value] of Object.entries(corsHeaders)) {
      response.headers.set(key, value)
    }
    return response
  }

  return new Response('OK', { headers: corsHeaders, status: 200 })
}

export const handle = sequence(handleCors, handleAuth)
