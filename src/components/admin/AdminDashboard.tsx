import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../context/SupabaseContext';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';

interface Translation {
  id: string;
  key: string;
  language: string;
  value: string;
}

const AdminDashboard = () => {
  const { supabase } = useSupabase();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ key: '', language: '', value: '' });

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('key', { ascending: true });

    if (error) {
      console.error('Error fetching translations:', error);
      return;
    }

    setTranslations(data);
    setLoading(false);
  };

  const handleEdit = (translation: Translation) => {
    setEditingId(translation.id);
    setEditForm({
      key: translation.key,
      language: translation.language,
      value: translation.value,
    });
  };

  const handleSave = async () => {
    if (editingId) {
      const { error } = await supabase
        .from('translations')
        .update({
          key: editForm.key,
          language: editForm.language,
          value: editForm.value,
          updated_at: new Date(),
        })
        .eq('id', editingId);

      if (error) {
        console.error('Error updating translation:', error);
        return;
      }

      setEditingId(null);
      fetchTranslations();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('translations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting translation:', error);
      return;
    }

    fetchTranslations();
  };

  const handleAdd = async () => {
    const { error } = await supabase
      .from('translations')
      .insert([{
        key: editForm.key,
        language: editForm.language,
        value: editForm.value,
      }]);

    if (error) {
      console.error('Error adding translation:', error);
      return;
    }

    setEditForm({ key: '', language: '', value: '' });
    fetchTranslations();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Add New Translation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Translation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Key"
            value={editForm.key}
            onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
            className="input"
          />
          <select
            value={editForm.language}
            onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
            className="input"
          >
            <option value="">Select Language</option>
            <option value="en">English</option>
            <option value="ckb">Sorani Kurdish</option>
            <option value="kmj">Kurmanji Kurdish</option>
          </select>
          <input
            type="text"
            placeholder="Value"
            value={editForm.value}
            onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
            className="input"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 btn btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Translation
        </button>
      </div>

      {/* Translations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {translations.map((translation) => (
              <tr key={translation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === translation.id ? (
                    <input
                      type="text"
                      value={editForm.key}
                      onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                      className="input"
                    />
                  ) : (
                    translation.key
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === translation.id ? (
                    <select
                      value={editForm.language}
                      onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                      className="input"
                    >
                      <option value="en">English</option>
                      <option value="ckb">Sorani Kurdish</option>
                      <option value="kmj">Kurmanji Kurdish</option>
                    </select>
                  ) : (
                    translation.language
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === translation.id ? (
                    <input
                      type="text"
                      value={editForm.value}
                      onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                      className="input"
                    />
                  ) : (
                    translation.value
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === translation.id ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(translation)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(translation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;