'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  label: string;
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryLabel.trim()) return;

    setAdding(true);
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ label: newCategoryLabel }),
      });

      if (response.ok) {
        setNewCategoryLabel('');
        fetchCategories();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to add category');
      }
    } catch (error) {
      console.error('Failed to add category:', error);
      alert('Failed to add category');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category? Clients with this category will keep it, but it won\'t be available for new selections.')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/categories?id=${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    router.push('/admin');
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
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Category Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4">
            <input
              type="text"
              value={newCategoryLabel}
              onChange={(e) => setNewCategoryLabel(e.target.value)}
              placeholder="Category name (e.g., Desserts)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              disabled={adding}
            />
            <button
              type="submit"
              disabled={adding || !newCategoryLabel.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding ? 'Adding...' : 'Add Category'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Category ID will be auto-generated from the name (e.g., &quot;Ice Cream&quot; → &quot;ice-cream&quot;)
          </p>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Existing Categories ({categories.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {categories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No categories yet. Add one above!
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{category.label}</h3>
                    <p className="text-sm text-gray-500">ID: {category.id}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">ℹ️ Important Notes:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Categories act as keywords/tags for filtering clients</li>
            <li>Deleting a category won&apos;t remove it from existing clients</li>
            <li>New categories are immediately available for selection when adding/editing clients</li>
            <li>Category IDs are automatically generated and cannot be changed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
