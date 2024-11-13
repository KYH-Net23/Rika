import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useProductContext } from "../../../../lib/ProductProvider";

import HeartIcon from "../../../../assets/icons/HeartIcon";
import BagWhite from "../../../../assets/icons/BagWhite";

const Detailssection = () => {
  const { id } = useParams();
  const { getProductData } = useProductContext();
  const [productDetails, setProductDetails] = useState({
    brand: "",
    model: "",
    description: "",
    price: 0,
    size: [],
    image: "/No_Product_Image_Available.png",
  });

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductData(id);
      setProductDetails(data);
    };
    fetchProductDetails();
  }, [id]);

  const handleSub = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSizeClick = (sizeOption) => {
    if (size === sizeOption) {
      setSize("");
    } else if (productDetails.size.includes(sizeOption)) {
      setSize(sizeOption);
      setSizeError("");
    } else {
      setSizeError("This size is not available right now");
    }
  };

  const addToCart = () => {
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

    existingCart.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <section>
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
          <button onClick={() => handleSub()}>-</button>
          <span className="font-mont font-medium min-w-5 text-center">
            {quantity}
          </span>
          <button onClick={() => handleAdd()}>+</button>
        </div>
      </div>

      <div className="flex gap-4 px-4 flex-col">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Description
        </h1>
        <p className="font-mont text-[#666666]">{productDetails.description}</p>
      </div>

      <div className="flex-col gap-4 px-4 py-6">
        {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
          <button
            key={sizeOption}
            onClick={() => handleSizeClick(sizeOption)}
            className={`${
              size === sizeOption
                ? "bg-black text-white"
                : "bg-white text-black"
            } border-2 hover:bg-black hover:text-white font-bold py-2 px-4 rounded-full`}
          >
            {sizeOption}
          </button>
        ))}
      </div>
      <div>{sizeError && <p className="text-red-500">{sizeError}</p>}</div>

      <div className="flex gap-4 px-4 py-6">
        <button className="bg-[#ebebeb] rounded-xl px-3 py-3">
          <HeartIcon />
        </button>
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
