export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero section light-background"
      style={{
        backgroundImage: 'url("/assets/img/Andrea Foodstyle - Web Banner - 2560 x 1440.png")',
        backgroundSize: '150%',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="container" data-aos="zoom-out">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h2>Andrea Abi Khalil</h2>
            <p>I'm <span className="typed" data-typed-items="Food Stylist, Culinary Artist, Food Photographer, Recipe Developer"></span></p>
            <div className="social-links">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
