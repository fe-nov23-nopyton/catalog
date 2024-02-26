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
      <li className="pagination__item-reversed pagination__item-first">
        <Icon iconType={IconContent.Arrow} handleClick={handlePrevPage} isDisabled={currentPage === 1} />
      </li>
      {pages.map((page) => (
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
      </li>
    </ul>
  );
};
