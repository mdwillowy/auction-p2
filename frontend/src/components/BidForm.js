import React, { useState } from 'react';
import api from '../services/api';

function BidForm({ itemId, currentBid, onBidSuccess }) {
  const [bidAmount, setBidAmount] = useState(currentBid + 1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await api.placeBid(itemId, Number(bidAmount));
      onBidSuccess(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 
                      err.message || 
                      'Failed to place bid';
      setError(errorMsg);
      console.error('Bid error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          min={currentBid + 1}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Placing Bid...' : 'Place Bid'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default BidForm;
