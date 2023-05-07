import { useSelector } from 'react-redux';
import { selectCurrentPage } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';

function PaginationList({ totalPages, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const currentPage = useSelector(selectCurrentPage);

  return (
    <div>
      <ul>
        {pageNumbers.map(number => {
          return (
            <li key={number}>
              <button
                // disabled={currentPage === 1}
                onClick={() => {
                  paginate(number);
                }}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PaginationList;
