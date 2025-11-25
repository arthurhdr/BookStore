import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiCalendar } from 'react-icons/bi';
import { BsTextParagraph } from 'react-icons/bs';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='card max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-slide-up'
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
              <BiCalendar className="text-sm" />
              Published: {book.publishYear}
            </span>
            <p className="text-slate-500 text-sm mt-2 font-mono">ID: {book._id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <PiBookOpenTextLight className='text-primary-500 text-2xl mt-1 flex-shrink-0' />
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Title</h3>
              <h2 className='text-xl font-semibold text-slate-900'>{book.title}</h2>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <BiUserCircle className='text-primary-500 text-2xl mt-1 flex-shrink-0' />
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-1">Author</h3>
              <h2 className='text-lg font-medium text-slate-800'>{book.author}</h2>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
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

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600">
          <div>
            <span className="font-medium">Created:</span>{' '}
            {new Date(book.createdAt).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{' '}
            {new Date(book.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;