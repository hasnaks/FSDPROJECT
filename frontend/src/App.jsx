import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage';
import DogsCats from './pages/DogsCats';
import OtherAnimals from './pages/OtherAnimals';
import Shelters from './pages/Shelters';
import Favorites from './pages/Favorites';
import AdoptPage from './pages/AdoptPage';

import ProtectedRoute from './components/ProtectedRoute';
import { FavoritesProvider } from './context/FavoritesContext';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAdoptionMessages from './pages/admin/AdminAdoptionMessages';
import AdminDogsCats from './pages/admin/AdminDogsCats';
import AdminOtherAnimals from './pages/admin/AdminOtherAnimals';
import AdminShelters from './pages/admin/AdminShelters';

function App() {
  useEffect(() => {
    document.title = 'HappyPaws';
  }, []);

  // Check if current user is admin
  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role === 'admin';
  };

  return (
    <FavoritesProvider>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes (Logged-in users only) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <DogsCats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/other-animals"
          element={
            <ProtectedRoute>
              <OtherAnimals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/shelters"
          element={
            <ProtectedRoute>
              <Shelters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adopt"
          element={
            <ProtectedRoute>
              <AdoptPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adoption-messages"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminAdoptionMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dogscats"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDogsCats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/other-animals"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminOtherAnimals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/shelters"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminShelters />
            </ProtectedRoute>
          }
        />
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
