import React, { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl } from "../../constants/api";
import { Pagination, ProductCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import { getProducts } from "../../store/productSlice";
import loadingIcon from '../../assets/loading.gif'

const Dashboard = () => {
  //Fetched data from redux store
  const { data: products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  //States for filtering
  const [isFilter, setIsFilter] = useState(false);
  const [filteredProducts, setIsFilteredProducts] = useState([]);

  //States for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    axios.get(`${baseUrl}/products/categories`).then((res) => {
      console.log("res-->", res.data);

      setCategories(res.data);
      setIsLoading(false)
    });

    dispatch(getProducts());
  }, []);

  //Pagination
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  const handleFilter = (item) => {
    console.log("Cliked");
    let filteredData = products.filter((product) => product.category == item);
    setIsFilteredProducts(filteredData);
    console.log("Fit", filteredProducts);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsFilter(true);
    let filteredData = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setIsFilteredProducts(filteredData);
    console.log("search", filteredProducts);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadingIcon} alt="loading" width={100} />
      </div>
    );
  }

  return (
    <div className="app__dashboard">
      {/* Displays the category list */}

      <div className="category-list">
        <ul>
          <li
            onClick={() => [setIsFilter(false), setCategory("")]}
            className={category == "" ? "active__category" : ""}
          >
            All
          </li>
          {categories?.map((item) => (
            <li
              key={`category-${item}`}
              onClick={() => [
                setIsFilter(true),
                handleFilter(item),
                setCategory(item),
              ]}
              className={category == item ? "active__category" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Search bar */}
      <form className="app__navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          // required
          name="search"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          {/* <BsSearch /> */}
          Search
        </button>
      </form>

      {/* Displays the product list */}

      <div className="product-list">
        {isFilter
          ? filteredProducts?.map((item) => (
              <ProductCard key={item?.id} product={item} />
            ))
          : currentPosts?.map((item) => (
              <ProductCard key={item?.id} product={item} />
            ))}
      </div>
      <Pagination
        totalPosts={isFilter ? filteredProducts.length : products.length}
        postsPerPages={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Dashboard;
