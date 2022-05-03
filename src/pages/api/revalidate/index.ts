import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Recalidating notes page...')
  let revalidated = false

  try {
    await res.unstable_revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }

  res.json({ revalidated })
}
