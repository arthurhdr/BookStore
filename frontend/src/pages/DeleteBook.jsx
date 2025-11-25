import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../context/AuthContext';
import { MdOutlineDangerous } from 'react-icons/md';
import { PiBookOpenTextLight } from 'react-icons/pi';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { getAuthHeader } = useAuth();

  // Fetch book details to show which book is being deleted
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`, {
        headers: getAuthHeader(),
      })
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 404) {
          enqueueSnackbar('Book not found', { variant: 'error' });
          navigate('/');
        }
      });
  }, [id, getAuthHeader, enqueueSnackbar, navigate]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`, {
        headers: getAuthHeader(),
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 401) {
          enqueueSnackbar('Please login to delete books', { variant: 'error' });
        } else if (error.response?.status === 404) {
          enqueueSnackbar('Book not found', { variant: 'error' });
        } else {
          enqueueSnackbar('Error deleting book', { variant: 'error' });
        }
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="page-container animate-fade-in">
      <BackButton />
      
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <MdOutlineDangerous className="text-3xl text-red-600" />
          </div>
          <h1 className="section-title text-red-700">Delete Book</h1>
          <p className="text-slate-600">This action cannot be undone</p>
        </div>

        {loading && !book ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="card p-8 border-l-4 border-l-red-500">
            {/* Warning Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-3">
                <MdOutlineDangerous className="text-red-500 text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-800 mb-1">Warning: Irreversible Action</h3>
                  <p className="text-red-700 text-sm">
                    You are about to permanently delete this book from your collection. 
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Book Information */}
            {book && (
              <div className="bg-slate-50 rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <PiBookOpenTextLight className="text-primary-500 text-2xl" />
                  <h3 className="text-lg font-semibold text-slate-900">Book to be deleted:</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-700">Title:</span>
                    <p className="text-slate-900 font-medium">{book.title}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-slate-700">Author:</span>
                    <p className="text-slate-900">{book.author}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-slate-700">Published:</span>
                    <p className="text-slate-900">{book.publishYear}</p>
                  </div>
                  
                  {book.description && (
                    <div>
                      <span className="text-sm font-medium text-slate-700">Description:</span>
                      <p className="text-slate-700 text-sm mt-1 line-clamp-2">
                        {book.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Confirmation Text */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Are you sure you want to delete this book?
              </h3>
              <p className="text-slate-600">
                Please confirm this permanent deletion
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCancel}
                className="btn-secondary py-3 px-8 flex-1 sm:flex-none"
                disabled={loading}
              >
                Cancel
              </button>
              
              <button
                onClick={handleDeleteBook}
                className="btn-danger py-3 px-8 flex-1 sm:flex-none flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <MdOutlineDangerous className="text-lg" />
                    Yes, Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteBook;