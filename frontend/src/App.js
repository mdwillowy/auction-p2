import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import SellerDashboard from './pages/SellerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;