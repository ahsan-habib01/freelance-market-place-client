const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }

    return [...new Set(pages)];
  };

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border-2 border-[#ff9346] rounded-lg disabled:opacity-50"
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? 'bg-[#ff6900] text-white'
                : 'border-2 border-[#ff9346] hover:bg-[#ff9346] hover:text-white'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border-2 border-[#ff9346] rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
