'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageClass?: string;
}

export default function Layout({ children, pageTitle = 'MyResume', pageClass = 'index-page' }: LayoutProps) {
  useEffect(() => {
    // Add page class to body
    document.body.className = pageClass;
    
    // Wait for React hydration to complete before initializing scripts
    const loadScripts = () => {
      if (typeof window !== 'undefined') {
        // Initialize AOS with a delay to avoid hydration conflicts
        if (window.AOS) {
          setTimeout(() => {
            try {
              window.AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: true,
                mirror: false
              });
            } catch (error) {
              console.log('AOS initialization delayed');
            }
          }, 100);
        }

        // Initialize PureCounter with error handling
        if (window.PureCounter) {
          setTimeout(() => {
            try {
              new window.PureCounter();
            } catch (error) {
              console.log('PureCounter initialization delayed');
            }
          }, 200);
        }
      }
    };

    // Load scripts after React hydration is complete
    setTimeout(loadScripts, 1000);
  }, [pageClass]);

  return (
    <>

      <header id="header" className="header d-flex flex-column justify-content-center">
        <i className="header-toggle d-xl-none bi bi-list"></i>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link href="/#hero" className="active"><i className="bi bi-house navicon"></i><span>Home</span></Link></li>
            <li><Link href="/#about"><i className="bi bi-person navicon"></i><span>About</span></Link></li>
            <li><Link href="/clients"><i className="bi bi-images navicon"></i><span>Clients</span></Link></li>
            <li><Link href="/#services"><i className="bi bi-hdd-stack navicon"></i><span>Services</span></Link></li>
            <li><Link href="/#contact"><i className="bi bi-envelope navicon"></i><span>Contact</span></Link></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        {children}
      </main>

      <footer id="footer" className="footer position-relative light-background">
        <div className="container">
            <h3 className="sitename">Andrea Abi Khalil</h3>
            <p>Creating mouth-watering visuals that tell a story. Let&apos;s bring your culinary vision to life through expert food styling and photography.</p>
          <div className="social-links d-flex justify-content-center">
            {/* <a href=""><i className="bi bi-twitter-x"></i></a>
            <a href=""><i className="bi bi-facebook"></i></a> */}
            <a href="https://www.instagram.com/andreafoodstyle?igsh=MWdxd3N4bTYzMmYwYQ=="><i className="bi bi-instagram"></i></a>
            {/* <a href=""><i className="bi bi-skype"></i></a>
            <a href=""><i className="bi bi-linkedin"></i></a> */}
            <a href="https://www.tiktok.com/@andreafoodstyle?_r=1&_t=ZS-91XLmUNS62n"><i className="bi bi-tiktok"></i></a>

          </div>
          <div className="container">
            <div className="copyright">
                <span>Copyright</span> <strong className="px-1 sitename">Andrea Abi Khalil</strong> <span>All Rights Reserved</span>
            </div>
            <div className="credits">
              Poweredby <a href="https://www.fourthdimensiongroup.com//">FourthDimension</a> 
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      {/* <div id="preloader"></div> */}

      {/* Vendor JS Files - Load in dependency order */}
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/waypoints/noframework.waypoints.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/aos/aos.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/typed.js/typed.umd.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/php-email-form/validate.js" strategy="afterInteractive" />

      {/* Main JS File */}
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}
