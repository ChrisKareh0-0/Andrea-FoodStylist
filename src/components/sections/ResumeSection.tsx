export default function ResumeSection() {
  return (
    <section id="resume" className="resume section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <p>Passionate about creating visually stunning food presentations that tell a story. I specialize in bringing culinary creations to life through expert styling, photography, and artistic direction that makes food irresistible and memorable.</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Summary</h3>

            <div className="resume-item pb-0">
              <h4>Andrea Abi Khalil</h4>
              <p><em>Creative and detail-oriented Food Stylist with 8+ years of experience creating visually stunning food presentations for magazines, cookbooks, restaurants, and commercial campaigns.</em></p>
              <ul>
                <li>Los Angeles, CA</li>
                <li>(555) 123-4567</li>
                <li>andrea@andreamartinez.com</li>
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>Master of Fine Arts in Photography</h4>
              <h5>2014 - 2016</h5>
              <p><em>Art Center College of Design, Pasadena, CA</em></p>
              <p>Specialized in food photography and visual storytelling techniques. Focused on lighting, composition, and the art of making food look irresistible through the lens.</p>
            </div>

            <div className="resume-item">
              <h4>Bachelor of Culinary Arts</h4>
              <h5>2010 - 2014</h5>
              <p><em>Culinary Institute of America, Hyde Park, NY</em></p>
              <p>Comprehensive culinary education with emphasis on presentation techniques, food science, and the artistic aspects of cooking and plating.</p>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <h3 className="resume-title">Professional Experience</h3>
            <div className="resume-item">
              <h4>Senior Food Stylist</h4>
              <h5>2020 - Present</h5>
              <p><em>Food & Wine Magazine, Los Angeles, CA</em></p>
              <ul>
                <li>Lead food styling for major editorial shoots and cover features</li>
                <li>Collaborate with photographers and art directors to create compelling visual stories</li>
                <li>Manage prop selection, lighting setup, and food preparation for high-end shoots</li>
                <li>Mentor junior stylists and maintain quality standards across all projects</li>
              </ul>
            </div>

            <div className="resume-item">
              <h4>Freelance Food Stylist</h4>
              <h5>2016 - 2020</h5>
              <p><em>Various Clients, Los Angeles, CA</em></p>
              <ul>
                <li>Styled food for cookbooks, restaurant menus, and commercial campaigns</li>
                <li>Worked with top restaurants including Michelin-starred establishments</li>
                <li>Developed signature styling techniques for different cuisines and food types</li>
                <li>Built extensive prop collection and client network across the food industry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
