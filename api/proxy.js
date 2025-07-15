import cors from 'cors';
import fetch from 'node-fetch';

const corsMiddleware = cors();

export default async function handler(req, res) {
  // עוטפים עם CORS
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url parameter');
  try {
    const resp = await fetch(target);
    const contentType = resp.headers.get('content-type') || '';
    res.setHeader('content-type', contentType);
    const buffer = await resp.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send('Failed to fetch: ' + err.message);
  }
}

