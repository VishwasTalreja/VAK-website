import { useState } from "react";
import vakLogo from "../assets/vak.logo.png";
import vivekPhoto from "../assets/vivek-photo.webp";
import TaxUpdates from "./TaxUpdates";
import Insights from "./Insights";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import API_URL from "../config/api";
function PublicWebsite() {
  // Mobile navbar
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      {/* NAVBAR */}
<nav className="navbar">
  <div className="brand">
  <img
    src={vakLogo}
    alt="Vivek Anoop Kumar Tax & Legal Services"
    className="navbarLogo"
  />
</div>
  <button
    className="menuButton"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation menu"
  >
    {menuOpen ? "✕" : "☰"}
  </button>
  

  <div className={`navLinks ${menuOpen ? "navOpen" : ""}`}>
    <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
    <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
    <a href="#updates" onClick={() => setMenuOpen(false)}>Tax Updates</a>
    <a href="#insights" onClick={() => setMenuOpen(false)}>Insights</a>
    <a href="#testimonials" onClick={() => setMenuOpen(false)}>
      Testimonials
    </a>
    <a
      href="#contact"
      className="contactButton"
      onClick={() => setMenuOpen(false)}
    >
      Contact
    </a>
  </div>
</nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="heroContent">
          <p className="eyebrow">TAX & LEGAL SERVICES</p>

          <h1>
            Clarity in Tax.
            <br />
            Confidence in Law.
          </h1>

          <p className="heroText">
            Professional tax and legal guidance for individuals and businesses
            navigating an increasingly complex regulatory environment.
          </p>

          <div className="heroButtons">
            <a href="#contact" className="primaryButton">
              Get in Touch
            </a>

            <a href="#services" className="secondaryButton">
              Explore Services
            </a>
          </div>
        </div>

        <div className="heroVisual">

  <div className="heroVisualPanel"></div>

  <div className="heroCircle">
    <img
      src={vivekPhoto}
      alt="Vivek Anoop Kumar"
      className="heroPortrait"
    />
  </div>

  <div className="heroCaption">
    <span>Professional Tax & Legal Guidance</span>
  </div>

</div>
      </section>
      {/* ABOUT */}
<section id="about" className="aboutSection">

  {/* STATEMENT */}
  <div className="aboutStatement">

    <p className="aboutSectionLabel">
      STATEMENT
    </p>

    <h2>
      Tax &amp; legal matters
      <br />
      can be complex.

      <span>
        The guidance shouldn't be.
      </span>
    </h2>

    <p className="aboutStatementText">
      Clear advice, practical guidance and personal attention
      for individuals and businesses navigating tax and legal matters.
    </p>

  </div>


  {/* ABOUT VIVEK */}
  <div className="aboutPerson">

    <p className="aboutSectionLabel">
      ABOUT
    </p>

    <h3>
      Vivek Anoop Kumar
    </h3>

    <p>
      Vivek Anoop Kumar provides tax and legal assistance with an
      emphasis on understanding each client's circumstances,
      communicating complex matters clearly and providing practical
      guidance on the way forward.
    </p>

    <a href="#contact">
      Discuss Your Matter →
    </a>

  </div>


  {/* APPROACH */}
  <div className="aboutApproachGrid">

  <article className="aboutApproachCard">
    <span>01</span>

    <h3>Assess the Matter</h3>

    <p>
      Start with the facts, the circumstances and the issue at hand
      before deciding what needs to be done.
    </p>
  </article>


  <article className="aboutApproachCard">
    <span>02</span>

    <h3>Make It Clear</h3>

    <p>
      Break down complex tax and legal requirements into clear,
      understandable options and practical considerations.
    </p>
  </article>


  <article className="aboutApproachCard">
    <span>03</span>

    <h3>Move Forward</h3>

    <p>
      Identify the next steps and help clients proceed with greater
      clarity, preparation and confidence.
    </p>
  </article>

</div>
</section>
      {/* SERVICES */}
      <section id="services" className="servicesSection">
  <div className="servicesHeader">
    <div>
      <p className="sectionLabel">OUR SERVICES</p>
      <h2>Tax & Legal Solutions</h2>
    </div>

  
  </div>

  <div className="serviceGrid">

    <div className="serviceCard">
      <span>01</span>
      <h3>Income Tax</h3>
      <p>
        Assistance with income tax matters, filing requirements and
        compliance.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

    <div className="serviceCard">
      <span>02</span>
      <h3>Sales Tax</h3>
      <p>
        Guidance regarding sales tax registration, compliance and related
        matters.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

    <div className="serviceCard">
      <span>03</span>
      <h3>Tax Notices</h3>
      <p>
        Assistance in understanding and responding appropriately to tax
        notices.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

    <div className="serviceCard">
      <span>04</span>
      <h3>Tax Compliance</h3>
      <p>
        Support for individuals and businesses in meeting applicable tax
        compliance requirements.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

    <div className="serviceCard">
      <span>05</span>
      <h3>Tax Advisory</h3>
      <p>
        Guidance for understanding tax obligations and making informed
        decisions.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

    <div className="serviceCard">
      <span>06</span>
      <h3>Legal Assistance</h3>
      <p>
        Professional assistance with tax-related legal and regulatory
        matters.
      </p>
      <a href="#contact">Learn More →</a>
    </div>

  </div>
</section>
      {/* FBR UPDATES */}
      <TaxUpdates />
      {/* INSIGHTS */}
      <Insights />
      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <footer className="footer">

  <div className="footerBrand">
  <img
    src={vakLogo}
    alt="Vivek Anoop Kumar Tax & Legal Services"
    className="footerLogo"
  />

  <p>
    Professional tax and legal services focused on clear,
    practical guidance.
  </p>
</div>
  <div className="footerLinks">
    <h4>QUICK LINKS</h4>

    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#updates">Tax Updates</a>
    <a href="#insights">Insights</a>
    <a href="#contact">Contact</a>
  </div>

  <div className="footerContact">
    <h4>CONTACT</h4>

    <a href="tel:+923003140926">
      +92 3003140926
    </a>

    <p>vivektalreja18@gmail.com</p>
  </div>

  <div className="footerBottom">
    <p>© 2026 VAK — Vivek Anoop Kumar. All rights reserved.</p>

    <p>Tax & Legal Services</p>
  </div>

</footer>
    </>
  );
}

export default PublicWebsite;
