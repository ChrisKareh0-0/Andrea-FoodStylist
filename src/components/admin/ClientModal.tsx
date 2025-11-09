'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Client {
  id: string;
  name: string;
  categories: string[];
  description: string;
  logo: string | null;
  gallery: string[];
}

interface ClientModalProps {
  client: Client | null;
  onClose: () => void;
  onSave: () => void;
}

interface Category {
  id: string;
  label: string;
}

export default function ClientModal({ client, onClose, onSave }: ClientModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    categories: [] as string[],
    description: '',
  });
  const [logo, setLogo] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        categories: client.categories || [],
        description: client.description || '',
      });
      setLogo(client.logo);
    }
  }, [client]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return logo;

    setUploading(true);
    try {
      const token = localStorage.getItem('admin-token');
      const formData = new FormData();
      formData.append('file', logoFile);
      formData.append('type', 'logo');

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return data.url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      console.error('Logo upload failed:', error);
      alert('Failed to upload logo');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one category is selected
    if (formData.categories.length === 0) {
      alert('Please select at least one category');
      return;
    }

    setSaving(true);

    try {
      // Upload logo if new file selected
      let logoUrl = logo;
      if (logoFile) {
        logoUrl = await uploadLogo();
        if (!logoUrl && logoFile) {
          setSaving(false);
          return;
        }
      }

      const token = localStorage.getItem('admin-token');
      const clientData = {
        ...formData,
        logo: logoUrl,
        ...(client ? { id: client.id, gallery: client.gallery } : {}),
      };

      const url = '/api/clients';
      const method = client ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        onSave();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save client');
      }
    } catch (error) {
      console.error('Failed to save client:', error);
      alert('Failed to save client');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="e.g., Burger King"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories (Keywords) *
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Select all categories that apply. These act as keywords for filtering.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center space-x-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{cat.label}</span>
                  </label>
                ))}
              </div>
              {formData.categories.length === 0 && (
                <p className="text-xs text-red-500 mt-2">Please select at least one category</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                placeholder="Brief description of your work with this client"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              {logo && (
                <div className="mb-4">
                  <div className="w-32 h-32 relative border-2 border-gray-200 rounded-full overflow-hidden bg-white flex items-center justify-center p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src={logo}
                        alt="Logo preview"
                        fill
                        className="object-contain"
                        sizes="128px"
                      />
                    </div>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recommended: PNG with transparent background, min 500x500px
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : uploading ? 'Uploading...' : 'Save Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
