export default function StatsSection() {
  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="bi bi-emoji-smile"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="150" data-purecounter-duration="1" className="purecounter"></span>
              <p>Food Styling Projects</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="bi bi-journal-richtext"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="75" data-purecounter-duration="1" className="purecounter"></span>
              <p>Magazine Features</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="bi bi-headset"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="8" data-purecounter-duration="1" className="purecounter"></span>
              <p>Years Experience</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
            <i className="bi bi-people"></i>
            <div className="stats-item">
              <span data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="purecounter"></span>
              <p>Restaurant Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
