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
  const navWindow = 5;

  function visiblePagesHelper() {
    if (totalPages <= 5) {
      return pages;
    }

    const window = navWindow % 2 === 0 ? navWindow + 1 : navWindow;

    switch (true) {
      case currentPage > Math.ceil(window / 2) && currentPage < pages.length - Math.ceil(window / 2):
        return pages.slice(currentPage - Math.ceil(window / 2), currentPage + Math.ceil(window / 2) - 1);

      case currentPage <= Math.ceil(window / 2):
        return pages.slice(0, window);

      case currentPage >= pages.length - Math.ceil(window / 2):
        return pages.slice(pages.length - window, pages.length);

      default:
        return pages;
    }
  }

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

  function handleToTop() {
    onPageChange(1);
  }

  function handleToBottom() {
    onPageChange(totalPages);
  }

  return (
    <ul className="pagination">
      <li className={cn("pagination__item", { disabled: currentPage === 1 })}>
        <button
          className="pagination__link pagination__link--arrow-right"
          disabled={currentPage === 1}
          onClick={handleToTop}
        >
          &lt;&lt;
        </button>

        <button
          className="pagination__link pagination__link--arrow-right"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          &lt;
        </button>
      </li>
      {visiblePagesHelper().map((page) => (
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
        <button
          className="pagination__link pagination__link--arrow-left"
          disabled={currentPage === totalPages}
          onClick={handleToBottom}
        >
          &gt;&gt;
        </button>
      </li>
    </ul>
  );
};
