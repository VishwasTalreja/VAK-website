import API_URL from "../config/api";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/articles/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load article"
          );
        }

        setArticle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <main className="articlePage">

      <Link to="/#insights" className="articleBack">
        ← Back to Insights
      </Link>

      <div className="articlePageHeader">

        <span className="articleCategory">
          {article.category}
        </span>

        <h1>{article.title}</h1>

        <p className="articleDate">
          {new Date(article.createdAt).toLocaleDateString()}
        </p>

        <p className="articleSummary">
          {article.summary}
        </p>

      </div>

      <div className="articlePageContent">
        {article.content}
      </div>

    </main>
  );
}

export default ArticlePage;