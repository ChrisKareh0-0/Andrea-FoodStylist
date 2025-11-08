export default function AboutSection() {
  return (
    <section id="about" className="about section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>About</h2>
        <p>Passionate about creating visually stunning food presentations that tell a story. I specialize in bringing culinary creations to life through expert styling, photography, and artistic direction that makes food irresistible and memorable.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-4">
            <img src="/assets/img/profile-img.jpg" className="img-fluid" alt="" />
          </div>
          <div className="col-lg-8 content">
            <h2>Professional Food Stylist &amp; Culinary Artist.</h2>
            <p className="fst-italic py-3">
              With over 8 years of experience in food styling, I create mouth-watering visuals that capture the essence of culinary artistry and make every dish look absolutely irresistible.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>15 March 1992</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span>www.andreamartinez.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>+1 555 123 4567</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>Los Angeles, CA</span></li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>32</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>Culinary Arts</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>andrea@andreamartinez.com</span></li>
                  <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>Available</span></li>
                </ul>
              </div>
            </div>
            <p className="py-3">
              I believe that food styling is an art form that combines culinary expertise with visual storytelling. My work has been featured in major food magazines, cookbooks, and restaurant marketing campaigns. I specialize in creating that perfect moment when food looks so appetizing that viewers can almost taste it through the screen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
