import React, { useEffect, useState } from "react";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";
import { visiblePagesHelper } from "../../utils/visiblePagesHelper";

import "./Pagination.scss";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function handleNextPage(currentPage: number, totalPages: number, onPageChange: (page: number) => void) {
  if (currentPage < totalPages) {
    onPageChange(currentPage + 1);
  }
}

function handlePrevPage(currentPage: number, totalPages: number, onPageChange: (page: number) => void) {
  if (currentPage !== 1) {
    onPageChange(currentPage - 1);
  }
}

function handleToTop(onPageChange: (value: number) => void) {
  onPageChange(1);
}

function handleToBottom(onPageChange: (value: number) => void, totalPages: number) {
  onPageChange(totalPages);
}

export const Pagination: React.FC<Props> = ({ total, perPage, currentPage, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const navWindow = isMobile ? 3 : 5;

  return (
    <ul className="pagination">
      <li className="pagination__item-reversed pagination__item-first">
        <Icon
          iconType={IconContent.Arrow}
          handleClick={() => handlePrevPage(currentPage, totalPages, onPageChange)}
          isDisabled={currentPage === 1}
        />
        <Icon
          iconType={IconContent.Arrow}
          handleClick={() => handleToTop(onPageChange)}
          isDisabled={currentPage === 1}
          isDoubleArrow={true}
        />
      </li>
      {visiblePagesHelper(currentPage, totalPages, navWindow, pages).map((page) => (
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
        <Icon
          iconType={IconContent.Arrow}
          handleClick={() => handleNextPage(currentPage, totalPages, onPageChange)}
          isDisabled={currentPage === totalPages}
        />
        <Icon
          iconType={IconContent.Arrow}
          handleClick={() => handleToBottom(onPageChange, totalPages)}
          isDisabled={currentPage === totalPages}
          isDoubleArrow={true}
        />
      </li>
    </ul>
  );
};
