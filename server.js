const http = require('http');
const https = require('https');

const ORIGIN = 'https://time.com/';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractLatestStories(html) {
  if (!html) return [];

  const re = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  const stories = [];
  const seen = new Set();
  let match;

  while ((match = re.exec(html)) && stories.length < 6) {
    let href = match[1];
    let text = match[2].replace(/<[^>]+>/g, '').trim();

    if (!/(\/\d{6,}\/)/.test(href)) continue;

    if (!text) continue;

    if (href.startsWith('/')) href = 'https://time.com' + href;

    if (!seen.has(href)) {
      stories.push({ title: text, link: href });
      seen.add(href);
    }
  }

  return stories;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/getTimeStories') {
    try {
      const html = await fetchHtml(ORIGIN);
      const stories = extractLatestStories(html);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(stories, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not fetch stories' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found. Use /getTimeStories' }));
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/getTimeStories');
});
