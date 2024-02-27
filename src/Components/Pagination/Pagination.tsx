import React from "react";
import "./Pagination.scss";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / perPage);
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
      <li className="pagination__item-reversed pagination__item-first">
        <Icon iconType={IconContent.Arrow} handleClick={handlePrevPage} isDisabled={currentPage === 1} />
        <Icon
          iconType={IconContent.Arrow}
          handleClick={handleToTop}
          isDisabled={currentPage === 1}
          isDoubleArrow={true}
        />
      </li>
      {visiblePagesHelper().map((page) => (
        <li key={page} className="pagination__item">
          <Icon
            iconType={IconContent.Text}
            handleClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
            isSelected={currentPage === page}
            content={page.toString()}
          />
        </li>
      ))}
      <li className="pagination__item-last">
        <Icon iconType={IconContent.Arrow} handleClick={handleNextPage} isDisabled={currentPage === totalPages} />
        <Icon
          iconType={IconContent.Arrow}
          handleClick={handleToBottom}
          isDisabled={currentPage === totalPages}
          isDoubleArrow={true}
        />
      </li>
    </ul>
  );
};
