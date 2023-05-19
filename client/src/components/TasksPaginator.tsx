type TasksPaginatorProps = {
  count: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export const TasksPaginator = ({
  count,
  page,
  onPageChange,
  perPage,
}: TasksPaginatorProps) => {
  const getPaginationNumbers = (
    page: number,
    count: number,
    perPage: number
  ) => {
    const totalPages = Math.ceil(count / perPage);
    const paginationNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }

    return paginationNumbers.slice(
      Math.max(page - 2, 0),
      Math.min(page + 1, totalPages)
    );
  };

  const paginationNumbers = getPaginationNumbers(page, count, perPage);

  return (
    <nav aria-label="Tasks pagination" className="mt-auto mb-5">
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={() => (page === 1 ? null : onPageChange(page - 1))}>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {paginationNumbers.map((number) => (
          <li key={number} onClick={() => onPageChange(number)}>
            <a
              href="#"
              {...(number === page && { "aria-current": "page" })}
              style={{ minWidth: "30px" }}
              className={`${
                number === page
                  ? "z-10 px-3 py-2 leading-tight text-default border border-primary bg-primary hover:bg-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        {paginationNumbers[paginationNumbers.length - 1] !== page && (
          <li onClick={() => (page > count ? null : onPageChange(page + 1))}>
            <a
              href="#"
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};
