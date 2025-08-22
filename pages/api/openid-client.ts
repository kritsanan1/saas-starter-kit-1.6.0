// Leave the openid-client import to get nextjs to leave the library in node_modules after build
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({});
}