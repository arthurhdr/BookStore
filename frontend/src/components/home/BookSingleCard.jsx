import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow, BiCalendar } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='card p-5 hover:shadow-medium transition-all duration-300 animate-fade-in group'>
      {/* Year Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full border border-primary-200">
          <BiCalendar className="text-xs" />
          {book.publishYear}
        </span>
      </div>

      {/* Book ID */}
      <p className="text-slate-400 text-xs font-mono mb-4 truncate">#{book._id}</p>

      {/* Book Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2">
          <PiBookOpenTextLight className='text-primary-500 text-xl mt-1 flex-shrink-0' />
          <h3 className='text-lg font-semibold text-slate-900 line-clamp-2 group-hover:text-primary-600 transition-colors'>
            {book.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <BiUserCircle className='text-slate-500 text-lg flex-shrink-0' />
          <p className='text-slate-700 text-sm'>{book.author}</p>
        </div>

        {/* Description Preview */}
        {book.description && (
          <div className="mt-3">
            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex justify-between items-center pt-4 border-t border-slate-100'>
        <button
          onClick={() => setShowModal(true)}
          className="text-slate-500 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-primary-50"
          title="Quick View"
        >
          <BiShow className='text-xl' />
        </button>
        
        <Link 
          to={`/books/details/${book._id}`}
          className="text-slate-500 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50"
          title="Details"
        >
          <BsInfoCircle className='text-lg' />
        </Link>
        
        <Link 
          to={`/books/edit/${book._id}`}
          className="text-slate-500 hover:text-yellow-600 transition-colors p-2 rounded-lg hover:bg-yellow-50"
          title="Edit"
        >
          <AiOutlineEdit className='text-lg' />
        </Link>
        
        <Link 
          to={`/books/delete/${book._id}`}
          className="text-slate-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
          title="Delete"
        >
          <MdOutlineDelete className='text-lg' />
        </Link>
      </div>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;