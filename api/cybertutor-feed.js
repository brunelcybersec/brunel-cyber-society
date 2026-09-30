module.exports = async function handler(req, res) {
  const FEED = 'https://mohammedzuoriki.substack.com/feed';

  try {
    const response = await fetch(FEED, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; BrunelCyberSocietyBot/1.0)',
        'accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
      },
    });

    if (!response.ok) {
      res.status(response.status).send('Upstream fetch failed: HTTP ' + response.status);
      return;
    }

    const xml = await response.text();
    res.setHeader('content-type', 'application/xml; charset=utf-8');
    res.setHeader('cache-control', 's-maxage=1800, stale-while-revalidate=3600');
    res.status(200).send(xml);
  } catch (err) {
    res.status(502).send('Fetch error: ' + err.message);
  }
};