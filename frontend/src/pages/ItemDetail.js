import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import BidForm from '../components/BidForm';
import { AuthContext } from '../context/AuthContext';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState('');
  const [message, setMessage] = useState('');

  const fetchItem = async () => {
    try {
      const response = await api.getItemById(id);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleBidSuccess = (updatedItem) => {
    setItem(updatedItem);
    setMessage('Bid placed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/items/${id}`);
      navigate('/');
    } catch (err) {
      setDeleteError(err.response?.data?.msg || 'Failed to delete item');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading item details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
      <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg mb-4">{item.description}</p>
      <div className="mb-4">
      <p className="text-xl font-bold mb-2">Current Bid: ${item.currentBid}</p>
      <p className="text-lg mb-4">Next bid must be at least ${item.currentBid + 1}</p>
        {item.status === 'closed' && (
          <p className="text-red-500 font-bold">Auction has ended</p>
        )}
      </div>
      <BidForm 
        itemId={item._id} 
        currentBid={item.currentBid}
        onBidSuccess={handleBidSuccess}
      />
      
      {user?.isAdmin && (
        <button 
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
        >
          Delete Item
        </button>
      )}
      {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
    </div>
  );
}

export default ItemDetail;