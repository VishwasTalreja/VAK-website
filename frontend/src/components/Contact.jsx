import API_URL from "../config/api";
import { useState } from "react";
function Contact() {
  
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [message, setMessage] = useState("");

const [status, setStatus] = useState("");

  const phoneHasInvalidCharacters =
    phone !== "" && !/^[0-9+\-\s()]+$/.test(phone);

/*Connection */
  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setStatus("Sending...");

    const response = await fetch(
      `${API_URL}/api/inquiries`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setStatus("Message sent successfully!");

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

  } catch (error) {
    console.error(error);
    setStatus("Unable to send message. Please try again.");
  }
};
  return (
    <section id="contact" className="contactSection">

      <div className="contactInfo">

        <p className="sectionLabel">GET IN TOUCH</p>

        <h2>
          Let's Discuss
          <br />
          Your Matter.
        </h2>

        <p>
          Looking for assistance with a tax or legal matter? Get in touch
          with VAK to discuss your requirements.
        </p>

        <div className="contactDetails">

          <div>
            <span>PHONE</span>
            <a href="tel:+923360388955">
              +92 336 0388955
            </a>
          </div>

          <div>
            <span>EMAIL</span>
            <p>vivektalreja18@gmail.com</p>
          </div>

        </div>

      </div>

      <form className="contactForm" onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="phone">Phone</label>

<input
  id="phone"
  type="tel"
  inputMode="tel"
  placeholder="Your phone number"
  value={phone}
  onChange={(event) => setPhone(event.target.value)}
  aria-invalid={phoneHasInvalidCharacters}
  aria-describedby={
    phoneHasInvalidCharacters ? "phone-error" : undefined
  }
/>

{phoneHasInvalidCharacters && (
  <p id="phone-error" role="alert">
    Please enter a valid phone number.
  </p>
)}

        <label>Message</label>
        <textarea
          rows="5"
          placeholder="Tell us briefly about your matter"
          value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
        ></textarea>

        <button type="submit">
          Send Inquiry →
        </button>
        {status && (
  <p className="formStatus">
    {status}
  </p>
)}

      </form>

    </section>
  );
}

export default Contact;