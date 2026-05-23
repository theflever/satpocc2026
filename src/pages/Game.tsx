import { useEffect, useState } from "react";

const API_KEY = "c787aabf5a2a837412c56b9da6d9ad165b26fbfec9a8c3243d20ea4ec741e411";
const ENDPOINT = "https://serpapi.com/search";
const params = {
  engine: "google_play",
  q: "honkai",
  hl: "en",
  api_key: API_KEY,
};


function Game() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    const serpUrl = `${ENDPOINT}?${new URLSearchParams(params)}`;
    const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(serpUrl);
    
    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((result) => {
        setHighlight(result.app_highlight ?? null);
        setData(result.organic_results[0]?.items ?? []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if (data.length === 0) return <h1>No results found</h1>;

 return (
  <div className="page">
    <header className="site-header">
      <h1 className="site-title">Browse Honkai titles on Google Play</h1>
    </header>

    {highlight && (
      <section className="highlight-section">
        <span className="badge">Featured</span>
        <div className="highlight-card">
          <img className="highlight-thumb" src={highlight.thumbnail} alt={highlight.title} />
          <div className="highlight-info">
            <h2 className="highlight-title">{highlight.title}</h2>
            <p className="highlight-description">{highlight.description}</p>
            <div className="highlight-meta">
              <span className="meta-tag">⭐ {highlight.rating}</span>
              <span className="meta-tag">📥 {highlight.downloads}</span>
            </div>
            <a className="play-btn" href={highlight.link} target="_blank" rel="noreferrer">
              View on Play Store
            </a>
          </div>
        </div>
      </section>
    )}

    <section className="results-section">
      <h2 className="section-title">All Results</h2>
      <div className="card-grid">
        {data.map((app, index) => (
          <div className="app-card" key={index}>
            <img className="app-thumb" src={app.thumbnail} alt={app.title} />
            <div className="app-info">
              <h3 className="app-title">{app.title}</h3>
              <p className="app-author">{app.author}</p>
              <p className="app-description">{app.description}</p>
              <div className="app-meta">
                <span className="meta-tag">{app.category}</span>
                {app.rating && <span className="meta-tag">⭐ {app.rating}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
}
export default Game;