import API_URL from "../config/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllInsights() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/articles`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load articles"
          );
        }

        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="allInsightsPage">

      <div className="allInsightsHeader">
        <Link to="/" className="articleBack">
          ← Back to Home
        </Link>

        <p className="sectionLabel">
          KNOWLEDGE & INSIGHTS
        </p>

        <h1>Tax & Legal Insights</h1>

        <p>
          Practical information designed to make complex tax
          and legal matters easier to understand.
        </p>
      </div>

      {loading && <p>Loading insights...</p>}

      {error && (
        <p className="adminError">{error}</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p>No insights have been published yet.</p>
      )}

      <div className="articleGrid">
        {articles.map((article) => (
          <article
            className="articleCard"
            key={article._id}
          >
            <div className="articleImage">
              <span>VAK</span>
            </div>

            <div className="articleContent">
              <span className="articleCategory">
                {article.category}
              </span>

              <h3>{article.title}</h3>

              <p>{article.summary}</p>

              <Link to={`/insights/${article._id}`}>
                Read Article →
              </Link>
            </div>
          </article>
        ))}
      </div>

    </main>
  );
}

export default AllInsights;