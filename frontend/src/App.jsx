import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import Register from './pages/Register';
import Spinner from './components/Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/books/create' 
          element={
            <ProtectedRoute>
              <CreateBooks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/books/details/:id' 
          element={
            <ProtectedRoute>
              <ShowBook />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/books/edit/:id' 
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/books/delete/:id' 
          element={
            <ProtectedRoute>
              <DeleteBook />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;