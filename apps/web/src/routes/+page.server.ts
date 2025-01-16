import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch(
    'https://api.github.com/repos/nneewwoo/capsu-training-needs/releases/latest',
    {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }
  )

  const release = await response.json()
  const latestTag = release.tag_name

  return {
    latestTag
  }
}
