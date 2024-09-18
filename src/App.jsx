
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PublisherPage from './Pages/PublisherPage';
import CategoryPage from './Pages/CategoryPage';
import BookPage from './Pages/BookPage';
import AuthorPage from './Pages/AuthorPage';
import PurchasePage from './Pages/PurchasePage';
import LoginPage from './Pages/LoginPage';
import ResponsiveAppBar from './components/AppBar/ResponsiveAppBar'; // Import ResponsiveAppBar
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuth') === 'true';
    setIsAuth(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem('isAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
  };

  return (
    <Router>
      <ResponsiveAppBar isAuth={isAuth} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publishers" element={isAuth ? <PublisherPage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/categories" element={isAuth ? <CategoryPage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/books" element={isAuth ? <BookPage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/authors" element={isAuth ? <AuthorPage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/purchases" element={isAuth ? <PurchasePage /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;

