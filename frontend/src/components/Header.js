import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Auction Platform</h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="hover:text-blue-300">Home</Link>
            </li>
            {user ? (
              <li>
                <Link to="/seller" className="hover:text-blue-300 bg-green-500 px-3 py-1 rounded">
                  Add Auction Item
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/seller" className="hover:text-blue-300">
                  Add Aucton Item
                </Link>
              </li>
            )}
            {user ? (
              <li className="flex items-center space-x-4">
                <span className="font-medium">Welcome, {user.username}!</span>
                <button 
                  onClick={handleLogout}
                  className="hover:text-blue-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
