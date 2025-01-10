import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  console.log(import.meta.env)
}
