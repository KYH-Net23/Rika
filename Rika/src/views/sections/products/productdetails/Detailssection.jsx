import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProductContext } from "../../../../lib/ProductProvider";
import useFavorites from "../../../../lib/FavoritesProvider";

import HeartIcon from "../../../../assets/icons/HeartIcon";
import FilledHeartIcon from "../../../../assets/icons/FilledHeartIcon";
import BagWhite from "../../../../assets/icons/BagWhite";
import SuccessAlert from "../../../../common/SuccessAlert";

const Detailssection = () => {
  const { id } = useParams();
  const { getProductData } = useProductContext();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [productDetails, setProductDetails] = useState({
    brand: "",
    model: "",
    description: "",
    price: 0,
    sizes: [],
    image: "/No_Product_Image_Available.png",
  });

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState(""); 
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductData(id);
        const checkImageUrl = async (url) => {
          try {
            const response = await fetch(url);
            const contentType = response.headers.get("content-type");
            if (!response.ok || !contentType.includes("image")) {
              return "/No_Product_Image_Available.png";
            }
            return url;
          } catch {
            return "/No_Product_Image_Available.png";
          }
        };

        const validatedImageUrl = await checkImageUrl(data.image);
        setProductDetails({ ...data, image: validatedImageUrl });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, getProductData]);

  const handleSub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    if (!size) {
      setSizeError("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id,
      brand: productDetails.brand,
      model: productDetails.model,
      price: productDetails.price,
      size,
      image: productDetails.image,
      quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
  };

  const toggleFavorite = () => {
    const favoriteItem = {
      id,
      brand: productDetails.brand,
      model: productDetails.model,
      price: productDetails.price,
      image: productDetails.image,
    };

    if (isFavorite(id)) {
      removeFromFavorites(id);
      setFavoriteMessage("Favorite removed");
    } else {
      addToFavorites(favoriteItem);
      setFavoriteMessage("Favorite added!");
    }

    setShowFavoriteMessage(true);
    setTimeout(() => setShowFavoriteMessage(false), 2000);
  };

  return (
    <section>
      {showAlert && <SuccessAlert message="Item added to cart!" />}
      <div className="flex gap-4 px-4 py-8">
        <div className="flex-none">
          <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
            {productDetails.brand}
          </h1>
          <p className="font-mont text-[#666666]">{productDetails.model}</p>
          <p className="font-mont text-[#666666]">
            Price: ${productDetails.price.toFixed(2)}
          </p>
        </div>
        <div className="grow"></div>
        <div className="flex items-center justify-evenly w-[70px] h-[30px] rounded-[30px] px-1 bg-[#EEEEEE]">
          <button onClick={handleSub}>-</button>
          <span className="font-mont font-medium min-w-5 text-center">
            {quantity}
          </span>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
      <div className="flex gap-4 px-4 flex-col">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Description
        </h1>
        <p className="font-mont text-[#666666]">{productDetails.description}</p>
      </div>
      <div className="flex-col gap-4 px-4 py-6">
        {productDetails.category === "Clothing" ||
        productDetails.category === "Shoes" ? (
          <div>
            <select
              className="p-4 rounded-xl font-mont"
              value={size}
              onChange={(e) => {
                const selectedSize = e.target.value;
                if (selectedSize === "") {
                  setSize("");
                  setSizeError("Please select a valid size.");
                } else if (productDetails.sizes.includes(selectedSize)) {
                  setSize(selectedSize);
                  setSizeError("");
                } else {
                  setSizeError("This size is not available right now.");
                }
              }}
            >
              <option value="">Select a size</option>
              {productDetails.sizes.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>{/* Leave empty for Electronics */}</div>
        )}
      </div>
      <div>{sizeError && <p className="text-red-500">{sizeError}</p>}</div>
      <div className="flex gap-4 px-4 py-6">
        <button
          className="bg-[#ebebeb] rounded-xl px-3 py-3"
          onClick={toggleFavorite}
        >
          {isFavorite(id) ? <FilledHeartIcon /> : <HeartIcon />}
        </button>
        {showFavoriteMessage && (
          <div className="absolute top-[-10px] left-[50px] bg-black text-white text-sm p-2 rounded">
            {favoriteMessage}
          </div>
        )}
        <div className="grow"></div>
        <button
          onClick={addToCart}
          className="flex gap-3 items-center rounded-2xl bg-black text-white font-mont px-3"
        >
          <BagWhite /> Add to cart
        </button>
      </div>
    </section>
  );
};

export default Detailssection;
