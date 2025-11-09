'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ClientModal from '@/components/admin/ClientModal';
import GalleryModal from '@/components/admin/GalleryModal';

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

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchCategories();
    fetchClients();
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin');
  };

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsClientModalOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/clients?id=${clientId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchClients();
      } else {
        alert('Failed to delete client');
      }
    } catch (error) {
      console.error('Failed to delete client:', error);
      alert('Failed to delete client');
    }
  };

  const handleManageGallery = (client: Client) => {
    setSelectedClient(client);
    setIsGalleryModalOpen(true);
  };

  const handleClientSaved = () => {
    setIsClientModalOpen(false);
    fetchClients();
  };

  const handleGallerySaved = () => {
    setIsGalleryModalOpen(false);
    fetchClients();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <Link
              href="/admin/categories"
              className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition font-medium"
            >
              Manage Categories
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full sm:w-64"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full sm:w-48"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddClient}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition w-full sm:w-auto"
          >
            + Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Filtered Results</p>
            <p className="text-3xl font-bold text-gray-900">{filteredClients.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
          </div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {client.logo ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-gray-200 flex items-center justify-center p-2 mb-3">
                      <div className="relative w-full h-full">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                      <span className="text-gray-400 text-xs">No Logo</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {client.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{client.description || 'No description'}</p>

              <div className="text-sm text-gray-500 mb-4">
                Gallery: {client.gallery?.length || 0} images
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClient(client)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleManageGallery(client)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                >
                  Gallery
                </button>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No clients found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {isClientModalOpen && (
        <ClientModal
          client={selectedClient}
          onClose={() => setIsClientModalOpen(false)}
          onSave={handleClientSaved}
        />
      )}

      {isGalleryModalOpen && selectedClient && (
        <GalleryModal
          client={selectedClient}
          onClose={() => setIsGalleryModalOpen(false)}
          onSave={handleGallerySaved}
        />
      )}
    </div>
  );
}
