import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Github, 
  Link, 
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, GitHubUrl } from '../lib/supabase';

const AdminDashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [githubUrls, setGithubUrls] = useState<GitHubUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUrl, setEditingUrl] = useState<GitHubUrl | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGitHubUrls();
  }, []);

  const fetchGitHubUrls = async () => {
    try {
      const { data, error } = await supabase
        .from('github_urls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGithubUrls(data || []);
    } catch (error) {
      console.error('Error fetching GitHub URLs:', error);
      setError('Failed to load GitHub URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (editingUrl) {
        // Update existing URL
        const { error } = await supabase
          .from('github_urls')
          .update({
            url: formData.url,
            description: formData.description || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingUrl.id);

        if (error) throw error;
      } else {
        // Add new URL
        const { error } = await supabase
          .from('github_urls')
          .insert({
            url: formData.url,
            description: formData.description || null,
            created_by: user?.id
          });

        if (error) throw error;
      }

      // Reset form and refresh data
      setFormData({ url: '', description: '' });
      setShowForm(false);
      setEditingUrl(null);
      await fetchGitHubUrls();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    try {
      const { error } = await supabase
        .from('github_urls')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchGitHubUrls();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (url: GitHubUrl) => {
    setEditingUrl(url);
    setFormData({
      url: url.url,
      description: url.description || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ url: '', description: '' });
    setShowForm(false);
    setEditingUrl(null);
    setError('');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage GitHub URLs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <motion.button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add URL Button */}
        <div className="mb-8">
          <motion.button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add GitHub URL</span>
          </motion.button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingUrl ? 'Edit GitHub URL' : 'Add New GitHub URL'}
            </h2>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://github.com/username/repository"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? (
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    editingUrl ? 'Update URL' : 'Add URL'
                  )}
                </motion.button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* GitHub URLs List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">GitHub URLs</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <Loader className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Loading URLs...</p>
            </div>
          ) : githubUrls.length === 0 ? (
            <div className="p-8 text-center">
              <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No GitHub URLs added yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {githubUrls.map((url) => (
                <motion.div
                  key={url.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Github className="w-5 h-5 text-gray-400" />
                        <a
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium break-all"
                        >
                          {url.url}
                        </a>
                      </div>
                      
                      {url.description && (
                        <p className="text-gray-600 text-sm mb-2">{url.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(url.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>Admin</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <motion.button
                        onClick={() => handleEdit(url)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDelete(url.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
