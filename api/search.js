export default async function handler(req, res) {
  const params = new URLSearchParams({
    engine: "google_play",
    q: "honkai",
    hl: "en",
    api_key: process.env.SERPAPI_KEY,
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  const data = await response.json();
  res.status(200).json(data);
}