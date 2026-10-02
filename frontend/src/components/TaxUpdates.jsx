function TaxUpdates() {
  const resources = [
    {
      id: 1,
      type: "Income Tax",
      title: "Income Tax Notifications & SROs",
      description:
        "View official Income Tax SROs and notifications published by FBR.",
      link: "https://fbr.gov.pk/ShowSROs?Department=Income+Tax",
    },
    {
      id: 2,
      type: "SROs",
      title: "SROs & Notifications",
      description:
        "Browse official SROs covering Income Tax, Sales Tax, Federal Excise and Customs.",
      link: "https://www.fbr.gov.pk/sros",
    },
    {
      id: 3,
      type: "Circulars",
      title: "Orders & Circulars",
      description:
        "Access official FBR circulars and general orders for tax and regulatory matters.",
      link: "https://www.fbr.gov.pk/orders",
    },
  ];

  return (
    <section id="updates" className="updatesSection">
      <div className="updatesHeading">
        <div>
          <p className="sectionLabel">OFFICIAL RESOURCES</p>
          <h2>FBR & Tax Updates</h2>
        </div>

        <p>
          Access official tax notifications, SROs, circulars and regulatory
          developments published by the Federal Board of Revenue.
        </p>
      </div>

      <div className="updatesGrid">
        {resources.map((resource) => (
          <article className="updateCard" key={resource.id}>
            <div className="updateMeta">
              <span>{resource.type}</span>
              <span>Official FBR</span>
            </div>

            <h3>{resource.title}</h3>

            <p>{resource.description}</p>

            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit FBR →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TaxUpdates;