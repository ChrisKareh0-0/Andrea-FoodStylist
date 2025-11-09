'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageModal from '@/components/ImageModal';

interface Client {
  id: string;
  name: string;
  categories: string[];
  description: string;
  logo: string | null;
  gallery: string[];
}

interface Category {
  id: string;
  label: string;
}

export default function PortfolioSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchClients();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, categoryFilter]);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = [...clients];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchLower) ||
          client.description?.toLowerCase().includes(searchLower)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((client) => client.categories.includes(categoryFilter));
    }

    setFilteredClients(filtered);
  };

  const openModal = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const getClientImages = (client: Client) => {
    if (client.gallery && client.gallery.length > 0) {
      return client.gallery;
    }
    // Fallback to placeholder images
    return [
      `/assets/img/masonry-portfolio/masonry-portfolio-1.jpg`,
      `/assets/img/masonry-portfolio/masonry-portfolio-2.jpg`,
      `/assets/img/masonry-portfolio/masonry-portfolio-3.jpg`
    ];
  };

  if (loading) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container text-center">
          <p>Loading clients...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Explore my portfolio organized by client. Click on any client folder to view their food styling projects.</p>
      </div>

      {/* Search and Filter */}
      <div className="container mb-4" data-aos="fade-up">
        <div className="row gy-3">
          <div className="col-lg-6">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              style={{
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>
          <div className="col-lg-6">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select"
              style={{
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-muted mb-0">
            Showing {filteredClients.length} of {clients.length} clients
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
          {filteredClients.map((client) => (
            <div key={client.id} className="col-lg-3 col-md-4 col-sm-6">
              <div
                className="client-folder"
                onClick={() => openModal(client)}
                style={{ cursor: 'pointer' }}
              >
                {client.logo ? (
                  <div className="client-logo">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        width={80}
                        height={80}
                        className="logo-image"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="folder-icon">
                    <i className="bi bi-folder-fill"></i>
                  </div>
                )}
                <div className="folder-name">
                  <h6>{client.name}</h6>
                  <div className="client-categories">
                    {client.categories.map((category) => (
                      <span key={category} className="client-category">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredClients.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No clients found matching your criteria</p>
          </div>
        )}
      </div>

      {selectedClient && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          clientName={selectedClient.name}
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
          height: 140px;
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

        .client-logo {
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          max-width: 80px;
          max-height: 80px;
          width: auto;
          height: auto;
        }

        .folder-name {
          width: 100%;
        }

        .folder-name h6 {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #333;
          font-weight: 600;
          line-height: 1.2;
        }

        .client-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: center;
        }

        .client-category {
          display: inline-block;
          padding: 2px 8px;
          font-size: 0.65rem;
          background: #e7e3fc;
          color: #6b46c1;
          border-radius: 12px;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}
