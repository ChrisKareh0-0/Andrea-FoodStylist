"use client";

export default function HeroSection() {
  return (
    <>
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
              <div className="mt-4">
                <a href="/clients" className="btn-view-clients">
                  View My Client Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .btn-view-clients {
          display: inline-block;
          padding: 12px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-view-clients:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          color: white;
        }

        .btn-view-clients:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
