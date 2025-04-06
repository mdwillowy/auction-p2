import React, { useState } from 'react';
import api from '../services/api';

function SellerDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createItem(formData);
      setSuccess('Item created successfully!');
      setFormData({
        title: '',
        description: '',
        startingBid: '',
        image: ''
      });
      setError('');
    } catch (err) {
      console.error('Error creating item:', err);
      setError('Failed to create item. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Auction Item</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Starting Bid</label>
          <input
            type="number"
            name="startingBid"
            value={formData.startingBid}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default SellerDashboard;