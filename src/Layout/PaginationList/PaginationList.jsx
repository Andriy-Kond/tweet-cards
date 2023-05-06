function PaginationList({ cardsPerPage, totalCards, paginate }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map(number => {
          return (
            <li key={number}>
              <button
                onClick={() => {
                  paginate(number);
                }}
              >
                {' '}
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
