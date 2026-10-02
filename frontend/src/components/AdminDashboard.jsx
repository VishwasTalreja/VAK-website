import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function AdminDashboard({ onLogout }) {
  // =========================
  // INQUIRIES
  // =========================

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // ARTICLES
  // =========================

  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState("");

  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    published: true,
  });

  const [articleStatus, setArticleStatus] = useState("");

  // =========================
  // TESTIMONIALS
  // =========================

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState("");

  const [showTestimonialForm, setShowTestimonialForm] =
    useState(false);

  const [editingTestimonialId, setEditingTestimonialId] =
    useState(null);

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    text: "",
    published: true,
  });

  const [testimonialStatus, setTestimonialStatus] =
    useState("");

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    if (onLogout) {
      onLogout();
    }

    navigate("/admin");
  };

  // =========================
  // FETCH INQUIRIES
  // =========================

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${API_URL}/api/admin/inquiries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load inquiries"
          );
        }

        setInquiries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // =========================
  // FETCH ARTICLES
  // =========================

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${API_URL}/api/admin/articles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load articles"
          );
        }

        setArticles(data);
      } catch (error) {
        setArticlesError(error.message);
      } finally {
        setArticlesLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // =========================
  // FETCH TESTIMONIALS
  // =========================

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          `${API_URL}/api/admin/testimonials`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          handleLogout();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load testimonials"
          );
        }

        setTestimonials(data);
      } catch (error) {
        setTestimonialsError(error.message);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // =========================
  // DELETE INQUIRY
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/inquiries/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete inquiry"
        );
      }

      setInquiries((currentInquiries) =>
        currentInquiries.filter(
          (inquiry) => inquiry._id !== id
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // =========================
  // SAVE ARTICLE
  // =========================

  const handleSaveArticle = async (event) => {
    event.preventDefault();

    setArticleStatus("");

    if (
      !articleForm.title.trim() ||
      !articleForm.category.trim() ||
      !articleForm.summary.trim() ||
      !articleForm.content.trim()
    ) {
      setArticleStatus("Please complete all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const isEditing = editingArticleId !== null;

      const url = isEditing
        ? `${API_URL}/api/admin/articles/${editingArticleId}`
        : `${API_URL}/api/admin/articles`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(articleForm),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update article"
              : "Failed to create article")
        );
      }

      if (isEditing) {
        setArticles((currentArticles) =>
          currentArticles.map((article) =>
            article._id === editingArticleId
              ? data.article
              : article
          )
        );
      } else {
        setArticles((currentArticles) => [
          data.article,
          ...currentArticles,
        ]);
      }

      setArticleForm({
        title: "",
        category: "",
        summary: "",
        content: "",
        published: true,
      });

      setEditingArticleId(null);
      setShowArticleForm(false);
    } catch (error) {
      setArticleStatus(error.message);
    }
  };

  // =========================
  // EDIT ARTICLE
  // =========================

  const handleEditArticle = (article) => {
    setEditingArticleId(article._id);

    setArticleForm({
      title: article.title,
      category: article.category,
      summary: article.summary,
      content: article.content,
      published: article.published,
    });

    setArticleStatus("");
    setShowArticleForm(true);
  };

  // =========================
  // DELETE ARTICLE
  // =========================

  const handleDeleteArticle = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this article?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete article"
        );
      }

      setArticles((currentArticles) =>
        currentArticles.filter(
          (article) => article._id !== id
        )
      );
    } catch (error) {
      setArticlesError(error.message);
    }
  };

  // =========================
  // ARTICLE PUBLISH / UNPUBLISH
  // =========================

  const handleTogglePublish = async (article) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/articles/${article._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: article.title,
            category: article.category,
            summary: article.summary,
            content: article.content,
            published: !article.published,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to change article status"
        );
      }

      setArticles((currentArticles) =>
        currentArticles.map((currentArticle) =>
          currentArticle._id === article._id
            ? data.article
            : currentArticle
        )
      );
    } catch (error) {
      setArticlesError(error.message);
    }
  };

  // ==========================================
  // SAVE / CREATE / UPDATE TESTIMONIAL
  // ==========================================

  const handleSaveTestimonial = async (event) => {
    event.preventDefault();

    setTestimonialStatus("");

    if (
      !testimonialForm.name.trim() ||
      !testimonialForm.text.trim()
    ) {
      setTestimonialStatus(
        "Client name and testimonial are required."
      );
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const isEditing =
        editingTestimonialId !== null;

      const url = isEditing
        ? `${API_URL}/api/admin/testimonials/${editingTestimonialId}`
        : `${API_URL}/api/admin/testimonials`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(testimonialForm),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update testimonial"
              : "Failed to create testimonial")
        );
      }

      if (isEditing) {
        setTestimonials((currentTestimonials) =>
          currentTestimonials.map((testimonial) =>
            testimonial._id === editingTestimonialId
              ? data.testimonial
              : testimonial
          )
        );
      } else {
        setTestimonials((currentTestimonials) => [
          data.testimonial,
          ...currentTestimonials,
        ]);
      }

      setTestimonialForm({
        name: "",
        role: "",
        text: "",
        published: true,
      });

      setEditingTestimonialId(null);
      setShowTestimonialForm(false);
    } catch (error) {
      setTestimonialStatus(error.message);
    }
  };

  // =========================
  // EDIT TESTIMONIAL
  // =========================

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonialId(testimonial._id);

    setTestimonialForm({
      name: testimonial.name,
      role: testimonial.role || "",
      text: testimonial.text,
      published: testimonial.published,
    });

    setTestimonialStatus("");
    setShowTestimonialForm(true);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE TESTIMONIAL
  // =========================

  const handleDeleteTestimonial = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this testimonial?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/testimonials/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete testimonial"
        );
      }

      setTestimonials((currentTestimonials) =>
        currentTestimonials.filter(
          (testimonial) => testimonial._id !== id
        )
      );
    } catch (error) {
      setTestimonialsError(error.message);
    }
  };

  // =================================
  // TESTIMONIAL PUBLISH / UNPUBLISH
  // =================================

  const handleToggleTestimonialPublish = async (
    testimonial
  ) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/admin/testimonials/${testimonial._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: testimonial.name,
            role: testimonial.role,
            text: testimonial.text,
            published: !testimonial.published,
          }),
        }
      );

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to change testimonial status"
        );
      }

      setTestimonials((currentTestimonials) =>
        currentTestimonials.map(
          (currentTestimonial) =>
            currentTestimonial._id ===
            testimonial._id
              ? data.testimonial
              : currentTestimonial
        )
      );
    } catch (error) {
      setTestimonialsError(error.message);
    }
  };

  return (
    <div className="adminDashboard">
      {/* =========================
          HEADER
      ========================= */}

      <div className="adminDashboardHeader">
        <div>
          <h1>VAK</h1>
          <p>ADMINISTRATION</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="adminDashboardContent">

        {/* =========================
            INQUIRIES
        ========================= */}

        <p className="sectionLabel">
          DASHBOARD
        </p>

        <h2>Client Inquiries</h2>

        <p>
          Messages submitted through the VAK website.
        </p>

        {loading && (
          <p>Loading inquiries...</p>
        )}

        {error && (
          <p className="adminError">
            {error}
          </p>
        )}

        {!loading &&
          !error &&
          inquiries.length === 0 && (
            <p>No inquiries yet.</p>
          )}

        <div className="inquiryGrid">
          {inquiries.map((inquiry) => (
            <div
              className="inquiryCard"
              key={inquiry._id}
            >
              <div className="inquiryTop">
                <h3>{inquiry.name}</h3>

                <span>
                  {new Date(
                    inquiry.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <p>
                <strong>Email:</strong>{" "}
                {inquiry.email}
              </p>

              {inquiry.phone && (
                <p>
                  <strong>Phone:</strong>{" "}
                  {inquiry.phone}
                </p>
              )}

              <div className="inquiryMessage">
                <strong>Message</strong>
                <p>{inquiry.message}</p>
              </div>

              <button
                className="deleteInquiryButton"
                onClick={() =>
                  handleDelete(inquiry._id)
                }
              >
                Delete Inquiry
              </button>
            </div>
          ))}
        </div>


        {/* =========================
            ARTICLE MANAGEMENT
        ========================= */}

        <div className="adminArticlesSection">
          <div className="adminArticlesHeading">
            <div>
              <p className="sectionLabel">
                CONTENT MANAGEMENT
              </p>

              <h2>Manage Articles</h2>

              <p>
                Create, edit, publish and manage
                website insights.
              </p>
            </div>

            <button
              className="createArticleButton"
              onClick={() => {
                setEditingArticleId(null);

                setArticleForm({
                  title: "",
                  category: "",
                  summary: "",
                  content: "",
                  published: true,
                });

                setArticleStatus("");
                setShowArticleForm(true);
              }}
            >
              + New Article
            </button>
          </div>

          {showArticleForm && (
            <form
              className="adminArticleForm"
              onSubmit={handleSaveArticle}
            >
              <div className="adminArticleFormHeader">
                <h3>
                  {editingArticleId
                    ? "Edit Article"
                    : "Create New Article"}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setShowArticleForm(false);
                    setEditingArticleId(null);

                    setArticleForm({
                      title: "",
                      category: "",
                      summary: "",
                      content: "",
                      published: true,
                    });
                  }}
                >
                  ✕
                </button>
              </div>

              <label>Title</label>

              <input
                type="text"
                value={articleForm.title}
                onChange={(e) =>
                  setArticleForm({
                    ...articleForm,
                    title: e.target.value,
                  })
                }
                placeholder="Article title"
              />

              <label>Category</label>

              <input
                type="text"
                value={articleForm.category}
                onChange={(e) =>
                  setArticleForm({
                    ...articleForm,
                    category: e.target.value,
                  })
                }
                placeholder="e.g. Income Tax"
              />

              <label>Summary</label>

              <textarea
                value={articleForm.summary}
                onChange={(e) =>
                  setArticleForm({
                    ...articleForm,
                    summary: e.target.value,
                  })
                }
                placeholder="Short description shown on the article card"
                rows="3"
              />

              <label>Article Content</label>

              <textarea
                value={articleForm.content}
                onChange={(e) =>
                  setArticleForm({
                    ...articleForm,
                    content: e.target.value,
                  })
                }
                placeholder="Write the full article here..."
                rows="12"
              />

              <label className="publishCheckbox">
                <input
                  type="checkbox"
                  checked={articleForm.published}
                  onChange={(e) =>
                    setArticleForm({
                      ...articleForm,
                      published:
                        e.target.checked,
                    })
                  }
                />

                Publish immediately
              </label>

              {articleStatus && (
                <p>{articleStatus}</p>
              )}

              <button
                type="submit"
                className="saveArticleButton"
              >
                {editingArticleId
                  ? "Save Changes"
                  : "Create Article"}
              </button>
            </form>
          )}

          {articlesError && (
            <p className="adminError">
              {articlesError}
            </p>
          )}

          {articlesLoading && (
            <p>Loading articles...</p>
          )}

          {!articlesLoading &&
            !articlesError &&
            articles.length === 0 && (
              <p>No articles yet.</p>
            )}

          <div className="adminArticleGrid">
            {articles.map((article) => (
              <div
                className="adminArticleCard"
                key={article._id}
              >
                <div className="adminArticleTop">
                  <span className="articleCategory">
                    {article.category}
                  </span>

                  <span
                    className={
                      article.published
                        ? "publishedStatus"
                        : "draftStatus"
                    }
                  >
                    {article.published
                      ? "Published"
                      : "Draft"}
                  </span>
                </div>

                <h3>{article.title}</h3>

                <p>{article.summary}</p>

                <div className="adminArticleDate">
                  {new Date(
                    article.createdAt
                  ).toLocaleDateString()}
                </div>

                <div className="adminArticleActions">
                  <button
                    onClick={() =>
                      handleEditArticle(article)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleTogglePublish(article)
                    }
                  >
                    {article.published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    className="deleteArticleButton"
                    onClick={() =>
                      handleDeleteArticle(
                        article._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* =========================
            TESTIMONIAL MANAGEMENT
        ========================= */}

        <div className="adminArticlesSection">

          <div className="adminArticlesHeading">
            <div>
              <p className="sectionLabel">
                CLIENT FEEDBACK
              </p>

              <h2>Manage Testimonials</h2>

              <p>
                Create, edit, publish and manage
                client testimonials.
              </p>
            </div>

            <button
              className="createArticleButton"
              onClick={() => {
                setEditingTestimonialId(null);

                setTestimonialForm({
                  name: "",
                  role: "",
                  text: "",
                  published: true,
                });

                setTestimonialStatus("");
                setShowTestimonialForm(true);
              }}
            >
              + New Testimonial
            </button>
          </div>


          {/* TESTIMONIAL FORM */}

          {showTestimonialForm && (
            <form
              className="adminArticleForm"
              onSubmit={handleSaveTestimonial}
            >
              <div className="adminArticleFormHeader">
                <h3>
                  {editingTestimonialId
                    ? "Edit Testimonial"
                    : "Create New Testimonial"}
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setShowTestimonialForm(false);
                    setEditingTestimonialId(null);

                    setTestimonialForm({
                      name: "",
                      role: "",
                      text: "",
                      published: true,
                    });

                    setTestimonialStatus("");
                  }}
                >
                  ✕
                </button>
              </div>

              <label>Client Name</label>

              <input
                type="text"
                value={testimonialForm.name}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    name: e.target.value,
                  })
                }
                placeholder="Client name"
              />

              <label>
                Client Type / Role
              </label>

              <input
                type="text"
                value={testimonialForm.role}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    role: e.target.value,
                  })
                }
                placeholder="e.g. Business Client"
              />

              <label>Testimonial</label>

              <textarea
                value={testimonialForm.text}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    text: e.target.value,
                  })
                }
                placeholder="Write the testimonial..."
                rows="6"
              />

              <label className="publishCheckbox">
                <input
                  type="checkbox"
                  checked={
                    testimonialForm.published
                  }
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      published:
                        e.target.checked,
                    })
                  }
                />

                Publish immediately
              </label>

              {testimonialStatus && (
                <p>{testimonialStatus}</p>
              )}

              <button
                type="submit"
                className="saveArticleButton"
              >
                {editingTestimonialId
                  ? "Save Changes"
                  : "Create Testimonial"}
              </button>
            </form>
          )}


          {/* ERRORS / LOADING */}

          {testimonialsError && (
            <p className="adminError">
              {testimonialsError}
            </p>
          )}

          {testimonialsLoading && (
            <p>Loading testimonials...</p>
          )}

          {!testimonialsLoading &&
            !testimonialsError &&
            testimonials.length === 0 && (
              <p>No testimonials yet.</p>
            )}


          {/* TESTIMONIAL CARDS */}

          <div className="adminArticleGrid">
            {testimonials.map((testimonial) => (
              <div
                className="adminArticleCard"
                key={testimonial._id}
              >
                <div className="adminArticleTop">

                  <span className="articleCategory">
                    {testimonial.role ||
                      "Client"}
                  </span>

                  <span
                    className={
                      testimonial.published
                        ? "publishedStatus"
                        : "draftStatus"
                    }
                  >
                    {testimonial.published
                      ? "Published"
                      : "Draft"}
                  </span>

                </div>

                <h3>
                  {testimonial.name}
                </h3>

                <p>
                  “{testimonial.text}”
                </p>

                <div className="adminArticleDate">
                  {new Date(
                    testimonial.createdAt
                  ).toLocaleDateString()}
                </div>

                <div className="adminArticleActions">

                  <button
                    onClick={() =>
                      handleEditTestimonial(
                        testimonial
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleToggleTestimonialPublish(
                        testimonial
                      )
                    }
                  >
                    {testimonial.published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    className="deleteArticleButton"
                    onClick={() =>
                      handleDeleteTestimonial(
                        testimonial._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;