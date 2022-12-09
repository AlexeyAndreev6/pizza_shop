import React, { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzasSlice";
import axios from "axios";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../pagination";
import { SearchContext } from "../App";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const items = useSelector((state) => state.pizza.items);

  const { searchValue } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      const {data} = await axios.get(
        `https://63459442745bd0dbd36c55a3.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log("error", error);
      alert("Ошибка при получении пицц");
    } finally {
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      console.log("sort", sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index) => onChangeCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination CurrentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
