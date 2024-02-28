import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";

import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { Breadcrumbs } from "../../Components/Breadcrumbs";
import { Pagination } from "../../Components/Pagination/Pagination";
import { Dropdown } from "../../Components/UI_Kit/Dropdown";
import { TempCard } from "../../Components/TempCard/TempCard";
import { TempSort } from "../../Components/TempCard/TempSort";
import { Input } from "../../Components/UI_Kit/Input/Input";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

import { sortItems } from "../../utils/sortItems";
import { filterItems } from "../../utils/filterItems";

import { Phone } from "../../types/Phone";
import { SortOptions } from "../../types/OptionsForSort";

import "./PhonesPage.scss";
import { ItemsOnPage } from "../../types/ItemsOnPage";
import { SearchParams } from "../../types/SearchParams";

const optionsForItemsOnPage = [ItemsOnPage.Sixteen, ItemsOnPage.Eight, ItemsOnPage.Four, ItemsOnPage.All];
const optionsForSort = [SortOptions.Cheapest, SortOptions.Alphabetically, SortOptions.Newest];

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

  const sort = searchParams.get(SearchParams.Sort) || "";
  const itemsOnPage = searchParams.get(SearchParams.ItemsOnPage) || "";
  const query = searchParams.get(SearchParams.Query) || "";
  // #endregion

  // #region pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = parseInt(itemsOnPage) || phones.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      scrollToTop();
    }, 0);
  };

  const prepareProducts = (phones: Phone[], sortBy: string, query: string) => {
    const filteredPhones = filterItems(phones, query);

    return sortItems(filteredPhones, sortBy);
  };

  const prepareVisiblePhones = (phones: Phone[], changeVisible: string) => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return changeVisible === ItemsOnPage.All ? phones : phones.slice(start, end);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: "smooth"
    });
  };
  // #endregion

  // #region search params
  const handleItemsOnPage = (param: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.ItemsOnPage, param);
    setSearchParams(params);

    setCurrentPage(1);

    localStorage.setItem(SearchParams.ItemsOnPage, param);
  };

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.Sort, sortBy);
    setSearchParams(params);

    localStorage.setItem(SearchParams.Sort, sortBy);
  };

  useEffect(() => {
    const valueSort = localStorage.getItem(SearchParams.Sort);
    const valueItemsOnPage = localStorage.getItem(SearchParams.ItemsOnPage);
    const valueQuery = localStorage.getItem(SearchParams.Query);

    const params = new URLSearchParams(searchParams);

    if (valueSort !== null) {
      params.set(SearchParams.Sort, valueSort);
    }
    if (valueItemsOnPage !== null) {
      params.set(SearchParams.ItemsOnPage, valueItemsOnPage);
    }
    if (valueQuery !== null) {
      params.set(SearchParams.Query, valueQuery);
    }

    setSearchParams(params);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const valueSort = localStorage.getItem(SearchParams.Sort);
      const valueItemsOnPage = localStorage.getItem(SearchParams.ItemsOnPage);

      if (valueSort !== null) {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.Sort, valueSort);
        setSearchParams(params);
      }
      if (valueItemsOnPage !== null) {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.ItemsOnPage, valueItemsOnPage);
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
      params.set(SearchParams.Query, newQuery);
    } else {
      params.delete(SearchParams.Query);
    }
    setSearchParams(params);

    if (newQuery === "") {
      localStorage.removeItem(SearchParams.Query);
    } else {
      localStorage.setItem(SearchParams.Query, newQuery);
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
            <p className="title">{errorMessage}</p>
          ) : (
            <>
              <p className="total-phones">{quantityPhones} models</p>
              <div className="dropdown-wrapper">
                <div className="dropdown-sortBy">
                  <Dropdown value={sort} list={optionsForSort} handleClick={handleSortBy} title={"Sort by"} />
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
                  {itemsOnPage !== ItemsOnPage.All && (
                    <Pagination
                      total={quantityPhones}
                      perPage={perPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <div style={{ paddingTop: "50px" }}>
                  <LookingGuy mainMessage="Sorry, There are not already yet any items" />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
