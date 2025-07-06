import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import DogsCats from './pages/DogsCats';
import OtherAnimals from './pages/OtherAnimals';
import Shelters from './pages/Shelters';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import Adoptpage from './pages/AdoptPage';

function App() {
  return (
    <FavoritesProvider>
      <>
        <title>HappyPaws</title>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pets" element={<DogsCats />} />
          <Route path="/category/other-animals" element={<OtherAnimals />} />
          <Route path="/category/shelters" element={<Shelters />} />
          <Route path="/category/favorites" element={<Favorites />} />
          <Route path="/adopt" element={<Adoptpage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    </FavoritesProvider>
  );
}

export default App;
