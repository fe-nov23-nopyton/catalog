/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import "./PhonesPage.scss";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";
import { Dropdown } from "../../Components/Dropdown";
import { sortItems } from "../../utils/sortItems";
import { Phone } from "../../types/Phone";
import { Breadcrumbs } from "../../Components/Breadcrumbs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Pagination } from "../../Components/Pagination/Pagination";
import { Loader } from "../../Components/Loader";

const optionsForItemsOnPage = ["16", "8", "4", "All"];
const optionsForSort = ["Cheapest", "Alphabetically", "Newest"];

export const PhonesPage: React.FC = () => {
  const { phones, loading, errorMessage } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhones());
  }, []);

  const { pathname } = useLocation();

  const [sort, setSort] = useState(optionsForSort[0]);

  const [itemsOnPage, setItemsOnPage] = useState(optionsForItemsOnPage[0]);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = parseInt(itemsOnPage) || phones.length;

  const navigate = useNavigate();

  const prepareProducts = (phones: Phone[], sortBy: string, changeVisible: string) => {
    const sortedPhones = sortItems(phones, sortBy);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return changeVisible === "All" ? sortedPhones : sortedPhones.slice(start, end);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 275,
      behavior: "smooth",
    });
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  const handleItemsOnPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsOnPage(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    scrollToTop();
  };

  const { page } = useParams<{ page: string }>();

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page]);

  const quantityPhones = phones.length;

  return (
    <>
      <Breadcrumbs path={pathname} />
      <div>
        <h1 className="title">Mobile phones</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!!errorMessage ? (
            <p className="title">{errorMessage}</p>
          ) : (
            <>
            {!!quantityPhones ? (
            <>
              <p className="total-phones">{quantityPhones} models</p>

              <div className="dropdown-wrapper">
                <Dropdown handleChange={handleSortChange} title={"Sort by"} options={optionsForSort} />
                <Dropdown
                  handleChange={handleItemsOnPageChange}
                  title={"Items on page"}
                  options={optionsForItemsOnPage}
                />
              </div>

              <ProductsList phones={prepareProducts(phones, sort, itemsOnPage)} />
              <Pagination
                total={quantityPhones}
                perPage={perPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              </>
            ) : (
              <p className="title">There are no products</p>
            )}
            </>
          )}
        </>
      )}
    </>
  );
};
