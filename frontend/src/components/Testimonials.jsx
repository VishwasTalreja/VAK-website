import { useEffect, useState } from "react";
import API_URL from "../config/api";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/testimonials`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load testimonials"
          );
        }

        setTestimonials(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentIndex((currentIndex) =>
          (currentIndex + 1) % testimonials.length
        );

        setVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const currentTestimonial =
    testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="testimonialsSection"
    >
      <div className="testimonialsHeader">
        <p className="sectionLabel">
          CLIENT EXPERIENCES
        </p>

        <h2>What Clients Say</h2>

        <p>
          Feedback from clients who have received
          tax and legal guidance from VAK.
        </p>
      </div>

      {loading && (
        <p className="testimonialMessage">
          Loading testimonials...
        </p>
      )}

      {error && (
        <p className="testimonialMessage">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        testimonials.length === 0 && (
          <p className="testimonialMessage">
            No testimonials available yet.
          </p>
        )}

      {!loading &&
        !error &&
        currentTestimonial && (
          <div
            className={`testimonialSlider ${
              visible ? "testimonialVisible" : "testimonialHidden"
            }`}
          >
            <div className="testimonialQuoteMark">
              “
            </div>

            <p className="testimonialSliderText">
              {currentTestimonial.text}
            </p>

            <div className="testimonialDivider"></div>

            <h3>
              {currentTestimonial.name}
            </h3>

            {currentTestimonial.role && (
              <span className="testimonialRole">
                {currentTestimonial.role}
              </span>
            )}
          </div>
        )}

      {testimonials.length > 1 && (
        <div className="testimonialDots">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial._id}
              className={
                index === currentIndex
                  ? "testimonialDot testimonialDotActive"
                  : "testimonialDot"
              }
              onClick={() => {
                setVisible(false);

                setTimeout(() => {
                  setCurrentIndex(index);
                  setVisible(true);
                }, 300);
              }}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Testimonials;