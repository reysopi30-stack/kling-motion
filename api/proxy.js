export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { url, method = 'GET', body, apiKey } = req.body || {};
  if (!url || !apiKey) return res.status(400).json({ error: 'Missing url or apiKey' });
  try {
    const opts = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-freepik-api-key': apiKey,
        'Accept': 'application/json'
      }
    };
    if (method === 'POST' && body) opts.body = JSON.stringify(body);
    const r = await fetch(url, opts);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
