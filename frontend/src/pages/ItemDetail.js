import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import BidForm from '../components/BidForm';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchItem();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading item details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
      <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-4" />
      <p className="text-lg mb-4">{item.description}</p>
      <p className="text-xl font-bold">Current Bid: ${item.currentBid}</p>
      <BidForm itemId={item._id} currentBid={item.currentBid} />
    </div>
  );
}

export default ItemDetail;