import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from 'notistack';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiCalendar } from 'react-icons/bi';
import { BsTextParagraph } from 'react-icons/bs';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { getAuthHeader } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

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
        console.log(error);
        setLoading(false);
        if (error.response?.status === 401) {
          enqueueSnackbar('Please login to view book details', { variant: 'error' });
        } else if (error.response?.status === 404) {
          enqueueSnackbar('Book not found', { variant: 'error' });
        } else {
          enqueueSnackbar('Error loading book', { variant: 'error' });
        }
      });
  }, [id, getAuthHeader, enqueueSnackbar]);

  return (
    <div className="page-container animate-fade-in">
      <BackButton />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title">Book Details</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <PiBookOpenTextLight className='text-primary-500 text-2xl mt-1 flex-shrink-0' />
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Title</h3>
                    <h2 className='text-2xl font-bold text-slate-900'>{book.title}</h2>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <BiUserCircle className='text-primary-500 text-2xl mt-1 flex-shrink-0' />
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-1">Author</h3>
                    <p className='text-lg font-medium text-slate-800'>{book.author}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <BsTextParagraph className='text-primary-500 text-2xl mt-1 flex-shrink-0' />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Description</h3>
                    {book.description ? (
                      <p className='text-slate-700 leading-relaxed whitespace-pre-line'>
                        {book.description}
                      </p>
                    ) : (
                      <p className='text-slate-500 italic'>
                        No description provided for this book.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar - Metadata */}
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Book Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Publish Year</span>
                      <div className="flex items-center gap-2 mt-1">
                        <BiCalendar className="text-slate-500" />
                        <span className="text-slate-900">{book.publishYear}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-slate-700">Book ID</span>
                      <p className="text-sm text-slate-600 font-mono mt-1 break-all">{book._id}</p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-slate-700">Created</span>
                      <p className="text-slate-600 text-sm mt-1">
                        {new Date(book.createdAt).toLocaleDateString()} at{' '}
                        {new Date(book.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-slate-700">Last Updated</span>
                      <p className="text-slate-600 text-sm mt-1">
                        {new Date(book.updatedAt).toLocaleDateString()} at{' '}
                        {new Date(book.updatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;