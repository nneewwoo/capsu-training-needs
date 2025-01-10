import { redirect, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  redirect(308, 'http://localhost:14141')
}
