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
import { Dropdown } from "../../Components/UI_Kit/Dropdown";
import { TempCard } from "../../Components/TempCard/TempCard";
import { TempSort } from "../../Components/TempCard/TempSort";
import { Input } from "../../Components/UI_Kit/Input/Input";
import { filterItems } from "../../utils/filterItems";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

const optionsForItemsOnPage = ["16", "8", "4", "All"];
const optionsForSort = ["Cheapest", "Alphabetically", "Newest"];

export const PhonesPage: React.FC = () => {
  // #region redux
  const { phones, loading, errorMessage } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhones());
  }, []);
  // #endregion

  // #region url params
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "";
  const itemsOnPage = searchParams.get("itemsOnPage") || "";
  const query = searchParams.get("query") || "";
  // #endregion

  // #region pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = parseInt(itemsOnPage) || phones.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const prepareProducts = (phones: Phone[], sortBy: string, query: string) => {
    const filteredPhones = filterItems(phones, query);
    const sortedPhones = sortItems(filteredPhones, sortBy);
    return sortedPhones;
  };

  const prepareVisiblePhones = (phones: Phone[], changeVisible: string) => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return changeVisible === "All" ? phones : phones.slice(start, end);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 260,
      behavior: "smooth"
    });
  };
  // #endregion

  // #region search params
  const handleItemsOnPage = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("itemsOnPage", param);
    setSearchParams(params);

    setCurrentPage(1);

    localStorage.setItem("itemsOnPage", param);
  };

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortBy);
    setSearchParams(params);

    localStorage.setItem("sort", sortBy);
  };

  useEffect(() => {
    const valueSort = localStorage.getItem("sort");
    const valueItemsOnPage = localStorage.getItem("itemsOnPage");
    const valueQuery = localStorage.getItem("query");

    const params = new URLSearchParams(searchParams);

    if (valueSort !== null) {
      params.set("sort", valueSort);
    }
    if (valueItemsOnPage !== null) {
      params.set("itemsOnPage", valueItemsOnPage);
    }
    if (valueQuery !== null) {
      params.set("query", valueQuery);
    }

    setSearchParams(params);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const valueSort = localStorage.getItem("sort");
      const valueItemsOnPage = localStorage.getItem("itemsOnPage");

      if (valueSort !== null) {
        const params = new URLSearchParams(searchParams);
        params.set("sort", valueSort);
        setSearchParams(params);
      }
      if (valueItemsOnPage !== null) {
        const params = new URLSearchParams(searchParams);
        params.set("itemsOnPage", valueItemsOnPage);
        setSearchParams(params);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchParams, setSearchParams]);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }
    setSearchParams(params);

    if (newQuery === "") {
      localStorage.removeItem("query");
    } else {
      localStorage.setItem("query", newQuery);
    }
  };
  // #endregion
  const preparedPhones = prepareProducts(phones, sort, query);
  const visiblePhones = prepareVisiblePhones(preparedPhones, itemsOnPage);

  const quantityPhones = preparedPhones.length;
  return (
    <div>
      <Breadcrumbs path={pathname} />
      <h1 className="title">Mobile phones</h1>
      {loading ? (
        <>
          <TempSort />
          <main className="grid">
            {[...Array(4)].map((_, index) => (
              <TempCard key={index} />
            ))}
          </main>
        </>
      ) : (
        <>
          {!!errorMessage ? (
            (console.log(errorMessage), (<p className="title">{errorMessage}</p>))
          ) : (
            <>
              <p className="total-phones">{quantityPhones} models</p>
              <div className="dropdown-wrapper">
                <div className="dropdown-sortBy">
                  <Dropdown 
                    value={sort} 
                    list={optionsForSort} 
                    handleClick={handleSortBy} 
                    title={"Sort by"} 
                  />
                </div>
                <div className="dropdown-itemsOnPage">
                  <Dropdown
                    value={itemsOnPage}
                    list={optionsForItemsOnPage}
                    handleClick={handleItemsOnPage}
                    title={"Items on page"}
                  />
                </div>
                <div className="dropdown-input">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChangeQuery}
                    name="query"
                    title="Search"
                  />
                </div>
              </div>
              {visiblePhones.length > 0 ? (
                <>
                  <ProductsList phones={visiblePhones} />
                  {itemsOnPage !== "All" && (
                    <Pagination
                      total={quantityPhones}
                      perPage={perPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <LookingGuy mainMessage="Sorry, There are not already yet any items"/>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
