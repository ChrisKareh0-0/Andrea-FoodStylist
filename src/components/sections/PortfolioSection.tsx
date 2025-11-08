'use client';

import { useState } from 'react';
import ImageModal from '@/components/ImageModal';

export default function PortfolioSection() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clients = [
    'Al Abdallah', 'Al Baker', 'Al Hallab', 'Al Kanater', 'Al Kazzi', 'Al Massoud', 'Al Mouajanati', 'Al Saudia Ice Cream',
    'Amici', 'Amour', 'Anthony\'s', 'Antika', 'Aromate', 'Arthaus', 'Bakerloo', 'Barista', 'Bartartine', 'Billy Boys',
    'Bonless', 'Boneless 28', 'Burger Basics', 'Burger King', 'Burj Al Hamam', 'Casper & Gambinis', 'Castania', 'Chick N Fish',
    'Cibo', 'City Canteen', 'Classic Sandwich', 'Coby Nammoura', 'Comfort', 'Cortina', 'Coucou', 'Crunchyz', 'Darina',
    'Dipndip', 'Diqan El Hachem', 'Earth Goods', 'Eddy\'s Street Food', 'El Comandante', 'El Sada', 'French Canteen',
    'Frunch Eatery', 'Furn Beaino', 'Gro&Greens', 'Gulf Soda', 'Hajdu', 'Hawa Chicken', 'Hi Cream', 'Husk', 'Insalata',
    'Jabbour', 'Jif', 'Judi', 'Kalita', 'Kammi', 'Sapori', 'Kaval', 'KFC', 'Kinza', 'La pasta', 'Lakkis Farm', 'Maggi',
    'Maharat Arabia', 'Mayrig', 'Mcdonalds', 'Merchak Al Baher', 'Midnight Munchies', 'Miniguette', 'Noor Mayonnaise',
    'Oh My Gelato', 'Patchi', 'Pepsi', 'Pick A Poke', 'Pix', 'Plein Soliel', 'Poke Bol', 'President', 'Promarche',
    'Prunelle', 'Puidor', 'Rashat Semsom', 'Richeese', 'Roadster', 'Sage&Savvy', 'Saj Nation', 'Salata', 'Sapori',
    'Second House', 'Shellelet Nabeh Merched', 'Siblou', 'Sitos', 'Smoak', 'Snack Aal Lebnene', 'Souchet', 'Spinneys',
    'St Georges Bakery', 'Stories', 'Suabelle', 'Sweet Bar', 'Swiss Butter', 'Tartina', 'The Cask & Barrel', 'Tigers',
    'Tom &b Mutz', 'Tony\'s Food', 'Truvia', 'Turab', 'Vaia', 'Vape Done', 'Watertown', 'Well Miel', 'Wingmen',
    'WonderSpread', 'Yamama', 'Yaza', 'Yazz', 'Zaatar W Zeit', 'Zephyr'
  ];

  const openModal = (clientName: string) => {
    setSelectedClient(clientName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  // Placeholder images for demo - in real implementation, these would be loaded dynamically
  const getClientImages = (clientName: string) => {
    return [
      `/assets/img/masonry-portfolio/masonry-portfolio-1.jpg`,
      `/assets/img/masonry-portfolio/masonry-portfolio-2.jpg`,
      `/assets/img/masonry-portfolio/masonry-portfolio-3.jpg`
    ];
  };

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Explore my portfolio organized by client. Click on any client folder to view their food styling projects.</p>
      </div>

      <div className="container">
        <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
          {clients.map((client, index) => (
            <div key={client} className="col-lg-3 col-md-4 col-sm-6">
              <div
                className="client-folder"
                onClick={() => openModal(client)}
                style={{ cursor: 'pointer' }}
              >
                <div className="folder-icon">
                  <i className="bi bi-folder-fill"></i>
                </div>
                <div className="folder-name">
                  <h6>{client}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          clientName={selectedClient}
          images={getClientImages(selectedClient)}
        />
      )}

      <style jsx>{`
        .client-folder {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1.5rem 1rem;
          text-align: center;
          transition: all 0.3s ease;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .client-folder:hover {
          background: #e9ecef;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .folder-icon {
          font-size: 2.5rem;
          color: #ffc107;
          margin-bottom: 0.5rem;
        }

        .folder-name h6 {
          margin: 0;
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
          line-height: 1.2;
        }
      `}</style>
    </section>
  );
}
