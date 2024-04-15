// Pagination.tsx

import { FC } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number; // Optional prop to limit the number of page numbers displayed
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, maxPagesToShow = 5 }) => {
  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    const maxVisiblePages = Math.min(totalPages, maxPagesToShow);

    if (currentPage <= maxVisiblePages) {
      for (let i = 1; i <= maxVisiblePages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - maxVisiblePages + 1) {
      for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const offset = Math.floor(maxPagesToShow / 2);
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex">
        <li>
          <button
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-l inline-flex items-center"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
        </li>
        {getPageNumbers().map(page => (
          <li key={page}>
            <button
              className={`${
                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              } font-semibold py-2 px-4 mx-1 rounded`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {maxPagesToShow < totalPages && (
          <li>
            <span className="px-4 py-2">...</span>
          </li>
        )}
        <li>
          <button
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-r inline-flex items-center"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
