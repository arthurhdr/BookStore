import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdOutlineAddBox, MdOutlineViewModule, MdOutlineTableChart } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const { user, logout, getAuthHeader } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books', {
        headers: getAuthHeader(),
      })
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Books</h1>
          <p className="text-slate-600 mt-2">Welcome back, {user?.username}! Manage your book collection.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-600 text-sm bg-slate-100 px-3 py-1 rounded-full">
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </span>
          <button
            onClick={logout}
            className="btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* View Toggle and Add Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              showType === 'table' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setShowType('table')}
          >
            <MdOutlineTableChart className="text-lg" />
            Table
          </button>
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              showType === 'card' 
                ? 'bg-white text-primary-600 shadow-sm' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setShowType('card')}
          >
            <MdOutlineViewModule className="text-lg" />
            Cards
          </button>
        </div>
        
        <Link to='/books/create' className="btn-primary flex items-center gap-2">
          <MdOutlineAddBox className="text-xl" />
          Add Book
        </Link>
      </div>

      {/* Books List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </div>
      ) : books.length === 0 ? (
        <div className="card p-12 text-center">
          <MdOutlineAddBox className="text-6xl text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No books yet</h3>
          <p className="text-slate-500 mb-6">Start building your collection by adding your first book.</p>
          <Link to='/books/create' className="btn-primary inline-flex items-center gap-2">
            <MdOutlineAddBox className="text-lg" />
            Add Your First Book
          </Link>
        </div>
      ) : showType === 'table' ? (
        <div className="card overflow-hidden animate-slide-up">
          <BooksTable books={books} />
        </div>
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;