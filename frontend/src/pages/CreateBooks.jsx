import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../context/AuthContext';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { getAuthHeader } = useAuth();

  const handleSaveBook = () => {
    if (!title.trim() || !author.trim() || !publishYear) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    const data = {
      title: title.trim(),
      author: author.trim(),
      publishYear: parseInt(publishYear),
      description: description.trim()
    };
    
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data, {
        headers: getAuthHeader(),
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 401) {
          enqueueSnackbar('Please login to create books', { variant: 'error' });
        } else {
          enqueueSnackbar('Error creating book', { variant: 'error' });
        }
        console.log(error);
      });
  };

  return (
    <div className="page-container animate-fade-in">
      <BackButton />
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Add New Book</h1>
          <p className="text-slate-600">Fill in the details below to add a new book to your collection.</p>
        </div>

        <div className="card p-8">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-xl">
              <Spinner size="lg" />
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Book Title *
              </label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Enter book title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Author *
              </label>
              <input
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input-field"
                placeholder="Enter author name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Publish Year *
              </label>
              <input
                type='number'
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="input-field"
                placeholder="Enter publish year"
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>

            {/* CAMPO DESCRIÇÃO ADICIONADO AQUI */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field min-h-[120px] resize-vertical"
                placeholder="Enter book description (optional)"
                rows="4"
              />
              <p className="text-slate-500 text-sm mt-1">
                Optional: Add a brief description or notes about this book.
              </p>
            </div>
            
            <button 
              onClick={handleSaveBook}
              className="btn-primary w-full py-3 mt-6"
              disabled={loading}
            >
              Add Book to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooks;