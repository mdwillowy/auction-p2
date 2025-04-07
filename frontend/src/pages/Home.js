import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BidForm from '../components/BidForm';

function Home() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBidSuccess = (updatedItem) => {
    setItems(prevItems => prevItems.map(item => 
      item._id === updatedItem._id ? updatedItem : item
    ));
    setError(null);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.getItems();
        if (!response.data) {
          throw new Error('No data received from API');
        }
        setItems(response.data);
        setError(null);
      } catch (error) {
        console.error('API Error:', {
          message: error.message,
          stack: error.stack,
          response: error.response?.data
        });
        setError(`Failed to load items: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchItems();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading auction items...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">${item.currentBid}</span>
            {user && user.isAdmin && (
                <button 
                  onClick={async () => {
                    if (window.confirm('Delete this item?')) {
                      await api.delete(`/items/${item._id}`);
                      setItems(items.filter(i => i._id !== item._id));
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            <div className="flex flex-col gap-2">
              <Link 
                to={`/item/${item._id}`}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center"
              >
                View Details
              </Link>
              <BidForm 
                itemId={item._id}
                currentBid={item.currentBid}
                onBidSuccess={handleBidSuccess}
              />
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;


