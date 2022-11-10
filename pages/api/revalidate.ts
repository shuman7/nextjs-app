// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { format } from 'path/posix';

type Data = {
  revalidated: boolean;
} 
| string;

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    // apiを叩ける人を制限する
    try {

      // post-format.tsxで生成したtokenを受け取って整形
      const token = req.headers.authorization?.split(' ') ?.[1] as string;
      // 上記は何をしているか？
      // 'Bearer xxxxxxx' のようなテキストを、スペースで区切って配列に入れている
      // ['Bearer', 'xxxxxxx']
      await  getAuth().verifyIdToken(token) //合言葉が正しければ下記の処理に進む

      // ページの再生成を行なっている本質的な箇所
      await res.revalidate(req.query.path as string)
      return res.json({ revalidated: true })
    } catch {
      return res.status(500).send('Error revalidating')
    }
}

export default handler;