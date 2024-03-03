import React, { useEffect } from "react";
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

import { ItemsOnPage } from "../../types/ItemsOnPage";
import { SearchParams } from "../../types/SearchParams";
import { useTranslation } from "react-i18next";

import "./PhonesPage.scss";

const optionsForItemsOnPage = [ItemsOnPage.Sixteen, ItemsOnPage.Eight, ItemsOnPage.Four, ItemsOnPage.All];
const optionsForSort = [SortOptions.Cheapest, SortOptions.Alphabetically, SortOptions.Newest];

export const PhonesPage: React.FC = () => {
  const { t } = useTranslation();
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
  const page = +(searchParams.get(SearchParams.Page) || "1");
  const perPage = searchParams.get(SearchParams.PerPage) || "16";
  const query = searchParams.get(SearchParams.Query) || "";
  // #endregion

  // #region pagination
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.Page, page.toString());
    setSearchParams(params);

    setTimeout(() => {
      scrollToTop();
    }, 0);
  };

  const prepareProducts = (phones: Phone[], sortBy: string, query: string) => {
    const filteredPhones = filterItems(phones, query);

    return sortItems(filteredPhones, sortBy);
  };

  const prepareVisiblePhones = (phones: Phone[], changeVisible: string) => {
    const start = (page - 1) * +perPage;
    const end = start + +perPage;

    return changeVisible === ItemsOnPage.All ? phones : phones.slice(start, end);
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
    params.set(SearchParams.PerPage, param);
    setSearchParams(params);

    localStorage.setItem(SearchParams.PerPage, param);
  };

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.Sort, sortBy);
    setSearchParams(params);

    localStorage.setItem(SearchParams.Sort, sortBy);
  };

  useEffect(() => {
    const valueSort = localStorage.getItem(SearchParams.Sort);
    const valueItemsOnPage = localStorage.getItem(SearchParams.PerPage);
    const valueQuery = localStorage.getItem(SearchParams.Query);

    const params = new URLSearchParams(searchParams);

    if (valueSort !== null) {
      params.set(SearchParams.Sort, valueSort);
    }
    if (valueItemsOnPage !== null) {
      params.set(SearchParams.PerPage, valueItemsOnPage);
    }
    if (valueQuery !== null) {
      params.set(SearchParams.Query, valueQuery);
    }

    setSearchParams(params);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const valueSort = localStorage.getItem(SearchParams.Sort);
      const valueItemsOnPage = localStorage.getItem(SearchParams.PerPage);

      if (valueSort !== null) {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.Sort, valueSort);
        setSearchParams(params);
      }
      if (valueItemsOnPage !== null) {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.PerPage, valueItemsOnPage);
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
  const visiblePhones = prepareVisiblePhones(preparedPhones, perPage);

  const quantityPhones = preparedPhones.length;
  return (
    <div>
      <Breadcrumbs path={pathname} />
      <h1 className="title">{t("phonesPage.title")}</h1>
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
              <p className="total-phones">
                {quantityPhones} {t("categories.models")}
              </p>
              <div className="dropdown-wrapper">
                <div className="dropdown-sortBy">
                  <Dropdown value={sort} list={optionsForSort} handleClick={handleSortBy} title={t("filter.sort")} />
                </div>
                <div className="dropdown-itemsOnPage">
                  <Dropdown
                    value={perPage}
                    list={optionsForItemsOnPage}
                    handleClick={handleItemsOnPage}
                    title={t("filter.itemsOnPage")}
                  />
                </div>
                <div className="dropdown-input">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChangeQuery}
                    name="query"
                    title={t("filter.search")}
                  />
                </div>
              </div>
              {visiblePhones.length > 0 ? (
                <>
                  <ProductsList phones={visiblePhones} />
                  {perPage !== ItemsOnPage.All && (
                    <Pagination
                      total={quantityPhones}
                      perPage={+perPage}
                      currentPage={page}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              ) : (
                <div style={{ paddingTop: "50px" }}>
                  <LookingGuy mainMessage={t("lookingGuy.noProducts")} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
