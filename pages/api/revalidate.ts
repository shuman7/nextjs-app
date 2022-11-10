// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean;
} 
| string;

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    // Check for secret to confirm this is a valid request
    // apiを叩ける人を制限しているのがこの箇所
    // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    //   return res.status(401).json({ message: 'Invalid token' })
    // }
  
    try {
      // ページの再生成を行なっている本質的な箇所
      await res.revalidate(req.query.path as string)
      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
}

export default handler;