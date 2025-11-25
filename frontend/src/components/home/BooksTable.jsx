import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 animate-fade-in">
      <table className='w-full'>
        <thead className='bg-slate-50 border-b border-slate-200'>
          <tr>
            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
              No
            </th>
            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden md:table-cell'>
              Author
            </th>
            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden lg:table-cell'>
              Year
            </th>
            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {books.map((book, index) => (
            <tr 
              key={book._id} 
              className="hover:bg-slate-50 transition-colors duration-150"
            >
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
                {index + 1}
              </td>
              <td className='px-6 py-4'>
                <div>
                  <div className="text-sm font-medium text-slate-900">{book.title}</div>
                  {book.description && (
                    <div className="text-sm text-slate-500 mt-1 line-clamp-1 hidden sm:block">
                      {book.description}
                    </div>
                  )}
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-700 hidden md:table-cell'>
                {book.author}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-700 hidden lg:table-cell'>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs">
                  <BiCalendar className="text-xs" />
                  {book.publishYear}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <div className='flex items-center gap-3'>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg">No books found</div>
          <div className="text-slate-500 text-sm mt-2">Add your first book to get started</div>
        </div>
      )}
    </div>
  );
};

export default BooksTable;