'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Client {
  id: string;
  name: string;
  categories: string[];
  description: string;
  logo: string | null;
  gallery: string[];
}

interface GalleryModalProps {
  client: Client;
  onClose: () => void;
  onSave: () => void;
}

export default function GalleryModal({ client, onClose, onSave }: GalleryModalProps) {
  const [gallery, setGallery] = useState<string[]>(client.gallery || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const token = localStorage.getItem('admin-token');
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'gallery');

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          uploadedUrls.push(data.url);
        }
      }

      setGallery([...gallery, ...uploadedUrls]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: client.id,
          name: client.name,
          categories: client.categories,
          description: client.description,
          logo: client.logo,
          gallery,
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        alert('Failed to save gallery');
      }
    } catch (error) {
      console.error('Failed to save gallery:', error);
      alert('Failed to save gallery');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Gallery - {client.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage gallery images for this client
          </p>
        </div>

        <div className="p-6">
          {/* Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select multiple images to upload. Recommended: High-quality JPG/PNG files
            </p>
            {uploading && (
              <p className="text-sm text-purple-600 mt-2">Uploading images...</p>
            )}
          </div>

          {/* Gallery Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Gallery Images ({gallery.length})
            </h3>
            {gallery.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No images in gallery yet</p>
                <p className="text-sm text-gray-400 mt-1">Upload images to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {gallery.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={imageUrl}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Gallery'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
