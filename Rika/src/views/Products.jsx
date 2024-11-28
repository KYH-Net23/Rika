import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useProductContext } from "../lib/ProductProvider";

import ArrowBack from "../common/ArrowBack";
import ProductCard from "./sections/products/ProductCard";
import SearchIcon from "../assets/icons/SearchIcon";
import SuccessAlert from "../common/SuccessAlert";
import SortIcon from "../assets/icons/SortIcon";

const Products = () => {
  const { getProductsData } = useProductContext();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(20);

  const queryParams = new URLSearchParams(location.search);
  const updateSuccess = queryParams.get("update") === "success";
  const deleteSuccess = queryParams.get("delete") === "success";

  const getProducts = async () => {
    const data = await getProductsData();
    setProducts(data);
    setFilteredProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, [getProductsData]);

  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOption === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAsc") {
      sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortOption === "nameDesc") {
      sortedProducts.sort((a, b) => b.brand.localeCompare(a.brand));
    }
    setFilteredProducts(sortedProducts);
  }, [sortOption, products]);

  useEffect(() => {
    const trimmedInput = searchInput.trim();

    if (trimmedInput === "") {
      setFilteredProducts(products);
      setNoResults(false);
    } else {
      const results = products.filter((product) =>
        product.brand?.toLowerCase().includes(trimmedInput.toLowerCase())
      );
      setFilteredProducts(results);

      if (results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    }
  }, [searchInput, products]);

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
  };

  const handleLoadMore = () => {
    setLoadedCount((prevCount) => prevCount + 10);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = searchInput.trim();
      if (trimmedInput === "") {
        setErrorMessage("Search cannot be empty.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      setErrorMessage("");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <nav className="flex justify-between items-center space-x-4 sm:space-x-8">
        <div className="flex-none">
          <ArrowBack goBackTo="/" />
        </div>

        {updateSuccess && (
          <div className="flex-none">
            <SuccessAlert message={"Product was successfully updated!"} />
          </div>
        )}

        <div className="flex justify-center w-full py-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className="bg-[#F3F4F5] w-auto py-2 pl-12 pr-10 border rounded-full shadow-lg hover:shadow-xl"
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
              <SearchIcon />
            </div>
            <div
              className="absolute top-1/3 right-2 transform -translate-y-1/2 cursor-pointer rounded-full p-2"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              <div className="w-6 h-9 ">
                <SortIcon className="" />
              </div>
            </div>
            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-15 w-25 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("priceDesc")}
                >
                  Price: High to Low
                </button>

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("priceAsc")}
                >
                  Price: Low to High
                </button>

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("nameAsc")}
                >
                  Name: A-Z
                </button>

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("nameDesc")}
                >
                  Name: Z-A
                </button>

                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleSortChange("default")}
                >
                  Clear Sorting
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {errorMessage && (
        <div className="text-gray-600 text-center font-mont mt-2">
          {errorMessage}
        </div>
      )}

      {deleteSuccess && (
        <div className="flex-none">
          <SuccessAlert message={"Product was successfully deleted!"} />
        </div>
      )}

      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 max-w-[835px]">
          <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
            Clothes
          </h1>

          {noResults && searchInput.trim() !== "" ? (
            <div className="flex flex-col justify-center gap-4 items-center h-40">
              <p className="font-mont">Product not found</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col justify-center gap-4 items-center h-40">
              <p className="font-mont">No products are available</p>
              <button
                onClick={getProducts}
                className="font-mont px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
              >
                Retry to load products
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-[15px] flex-wrap mb-[9px]">
              {filteredProducts.slice(0, loadedCount).map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="text-center text-gray-600 font-mont mt-2">
              {Math.min(loadedCount, filteredProducts.length)} of{" "}
              {filteredProducts.length} products showing
            </div>
          )}

          {loadedCount < filteredProducts.length && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="font-mont bg-black text-white px-6 py-3 rounded-md mt-4"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
