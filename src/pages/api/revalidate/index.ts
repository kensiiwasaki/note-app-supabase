import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Recalidating notes page...')
  if (req.query.secret !== process.env.REVALDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret id invalid !' })
  }
  let revalidated = false

  try {
    await res.unstable_revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }

  res.json({ revalidated })
}
