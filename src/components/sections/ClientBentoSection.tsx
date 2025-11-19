"use client";

import { useState, useEffect } from "react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import ImageModal from "@/components/ImageModal";
import {
  CameraIcon,
  RocketIcon,
  StarIcon,
  LightningBoltIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const icons = [RocketIcon, StarIcon, LightningBoltIcon, HeartIcon, CameraIcon];

interface Client {
  id: string;
  name: string;
  categories: string[];
  description: string;
  logo: string | null;
  gallery: string[];
}

interface FeaturedClient extends Client {
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  className: string;
}

// Available images for gallery
const availableImages = [
  "/assets/img/masonry-portfolio/masonry-portfolio-1.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-2.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-3.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-4.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-5.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-6.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-7.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-8.jpg",
  "/assets/img/masonry-portfolio/masonry-portfolio-9.jpg",
];

// Grid layout classes for bento grid
const gridClasses = [
  "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
];

export default function ClientBentoSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [featuredClients, setFeaturedClients] = useState<FeaturedClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/clients');
      const data = await response.json();
      const allClients = data.clients || [];
      setClients(allClients);

      // Shuffle and select 5 random clients
      const shuffled = [...allClients].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 5);

      const featured = selected.map((client, index) => ({
        ...client,
        icon: icons[index % icons.length],
        image: client.gallery && client.gallery.length > 0
          ? client.gallery[Math.floor(Math.random() * client.gallery.length)]
          : availableImages[Math.floor(Math.random() * availableImages.length)],
        className: gridClasses[index],
      }));

      setFeaturedClients(featured);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
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
    // Fallback to random images
    const shuffledImages = [...availableImages].sort(() => Math.random() - 0.5);
    return shuffledImages.slice(0, 6);
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/assets/img/backgroundPattern.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
        />
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/assets/img/backgroundPattern.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Clients</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Collaborating with world-renowned brands to create stunning food visuals that capture taste and inspire appetite.
          </p>
        </div>

        <BentoGrid className="lg:grid-rows-3" data-aos="fade-up" data-aos-delay="200">
          {featuredClients.map((client) => (
            <BentoCard
              key={client.id}
              name={client.name}
              description={client.description || `Exquisite food styling and culinary photography for ${client.name}`}
              Icon={client.logo ?
                // Custom logo component
                () => {
                  const logoSrc = client.logo || '';
                  return (
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-white/90 border-2 border-gray-200 flex items-center justify-center p-3 shadow-sm">
                      <div className="relative w-full h-full">
                        <Image
                          src={logoSrc}
                          alt={`${client.name} logo`}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                    </div>
                  );
                } :
                // Default icon
                client.icon
              }
              href="/clients"
              cta="View Gallery"
              className={client.className}
              onClick={() => openModal(client)}
              background={
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={client.image}
                    alt={`${client.name} food styling project`}
                    fill
                    className="object-cover opacity-40 transition-all duration-300 group-hover:opacity-60 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* View All Clients Button */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="300">
          <Link
            href="/clients"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Clients
          </Link>
        </div>
      </div>

      {/* Gallery Modal */}
      {selectedClient && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          clientName={selectedClient.name}
          images={getClientImages(selectedClient)}
        />
      )}
    </section>
  );
}
