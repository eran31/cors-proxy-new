import  express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('Missing url parameter');
  try {
    const resp = await fetch(target);
    const contentType = resp.headers.get('content-type') || '';
    res.set('content-type', contentType);
    const buffer = await resp.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send('Failed to fetch: ' + err.message);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
