import API_URL from "../config/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Insights() {
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
    <section id="insights" className="insightsSection">

      <div className="insightsHeader">
        <div>
          <p className="sectionLabel">KNOWLEDGE & INSIGHTS</p>
          <h2>Tax & Legal Insights</h2>
        </div>

      
      </div>

      {loading && (
        <p>Loading insights...</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p>No insights published yet.</p>
      )}

      <div className="articleGrid">

        {articles.slice(0, 3).map((article) => (
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
       {articles.length > 3 && (
  <div className="viewAllInsights">
    <Link to="/insights">
      View All Insights →
    </Link>
  </div>
)} 
    </section>
  );
}

export default Insights;