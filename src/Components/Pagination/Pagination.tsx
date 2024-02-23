import React from "react";
import cn from "classnames";
import "./Pagination.scss";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage - 1);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  }

  return (
    <ul className="pagination">
      <li className={cn("pagination__item", { disabled: currentPage === 1 })}>
        <button
          className="pagination__link pagination__link--arrow-right"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          &lt;
        </button>
      </li>
      {pages.map((page) => (
        <li className={cn("pagination__item", { active: currentPage === page })} key={page}>
          <button
            className="pagination__link"
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </button>
        </li>
      ))}
      <li className={cn("pagination__item", { disabled: currentPage === totalPages })}>
        <button
          className="pagination__link pagination__link--arrow-left"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};
