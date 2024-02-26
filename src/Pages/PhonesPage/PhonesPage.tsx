/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import "./PhonesPage.scss";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";
import { sortItems } from "../../utils/sortItems";
import { Phone } from "../../types/Phone";
import { Breadcrumbs } from "../../Components/Breadcrumbs";
import { useLocation, useSearchParams } from "react-router-dom";
import { Pagination } from "../../Components/Pagination/Pagination";
import { Loader } from "../../Components/Loader";
import { Dropdown } from "../../Components/UI_Kit/Dropdown";
import { Input } from "../../Components/UI_Kit/Input/Input";
import { filterItems } from "../../utils/filterItems";

const optionsForItemsOnPage = ["16", "8", "4", "All"];
const optionsForSort = ["Cheapest", "Alphabetically", "Newest"];

export const PhonesPage: React.FC = () => {
  const { phones, loading, errorMessage } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  // #region url params 
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const itemsOnPage = searchParams.get('itemsOnPage') || '';
  const query = searchParams.get('query') || '';
  // #endregion

  useEffect(() => {
    dispatch(fetchPhones());

    const valueSort = localStorage.getItem('sort');
    console.log("1 console", valueSort);
    const valueItemsOnPage = localStorage.getItem('itemsOnPage');

    if (valueSort) {
      const params = new URLSearchParams(searchParams);
      params.set('sort', valueSort);
      setSearchParams(params);
    }
    if (valueItemsOnPage) {
      const params = new URLSearchParams(searchParams);
      params.set('itemsOnPage', valueItemsOnPage);
      setSearchParams(params);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = parseInt(itemsOnPage) || phones.length;

  const prepareProducts = (phones: Phone[], sortBy: string, changeVisible: string, query: string) => {
    const filteredPhones = filterItems(phones, query);
    const sortedPhones = sortItems(filteredPhones, sortBy);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return changeVisible === "All" ? sortedPhones : sortedPhones.slice(start, end);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  }

  const handleItemsOnPage = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('itemsOnPage', param);
    setSearchParams(params);

    setCurrentPage(1);

    localStorage.setItem('itemsOnPage', param);
  };

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortBy);
    setSearchParams(params);

    localStorage.setItem('sort', sortBy);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set('query', newQuery);
    } else {
      params.delete('query');
    }
    setSearchParams(params);

    localStorage.setItem('query', newQuery);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const quantityPhones = phones.length;

  return (
    <div>
      <Breadcrumbs path={pathname} />

      <h1 className="title">Mobile phones</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {!!errorMessage ? (
            console.log(errorMessage),
            <p className="title">{errorMessage}</p>
          ) : (
            <>
            {!!quantityPhones ? (
            <>
              <p className="total-phones">{quantityPhones} models</p>

              <div className="dropdown-wrapper">
                <div className="dropdown-sortBy">
                  <Dropdown value={sort} list={optionsForSort} handleClick={handleSortBy} title={"Sort by"} />
                </div>
                <div className="dropdown-itemsOnPage">
                  <Dropdown value={itemsOnPage} list={optionsForItemsOnPage} handleClick={handleItemsOnPage} title={"Items on page"} />
                </div>
                <div className="dropdown-input">
                  <Input type="text" placeholder="Search..." value={query} onChange={handleChangeQuery} name="query" title="Search" />
                </div>
              </div>

              <ProductsList phones={prepareProducts(phones, sort, itemsOnPage, query)} />
              {itemsOnPage !== "All" && <Pagination
                total={quantityPhones}
                perPage={perPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />}
              
              </>
            ) : (
              <p className="title">There are no products</p>
            )}
            </>
          )}
        </>
      )}
    </div>
  );
};
