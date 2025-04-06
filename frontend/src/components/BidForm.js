import React, { useState } from 'react';
import api from '../services/api';

function BidForm({ itemId, currentBid }) {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(bidAmount) <= currentBid) {
      setError('Bid must be higher than the current bid.');
      return;
    }

    try {
      await api.placeBid(itemId, bidAmount);
      alert('Bid placed successfully!');
      setBidAmount('');
      setError('');
    } catch (err) {
      console.error('Error placing bid:', err);
      setError('Failed to place bid. Please try again.');
    }
  };

  return (
    <form onSubmit={handleBidSubmit} className="mt-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter your bid"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Place Bid
      </button>
    </form>
  );
}

export default BidForm;