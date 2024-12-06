import { useEffect, useState } from "react";
import ShoppingCartModal from "./ShoppingCartModal";
import ShoppingCartIcon from "../../../../../assets/icons/ShoppingCartIcon";
import CartIcon from "../../../../../assets/icons/CartIcon";

const ShoppingCart = ({ typeOfIcon = "" }) => {
  const [addedItems, setAddedItems] = useState(0);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setAddedItems(cartItems.length);
    setData(cartItems);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <div className="relative flex items-center w-[100%] h-[100%]">
        {addedItems > 0 ? (
          <div className="absolute flex items-center justify-center right-0 top-0 w-[13px] h-[13px] rounded-full bg-black">
            <span className="font-mont text-white font-medium text-[7px] leading-[14.56px] z-10">
              {addedItems}
            </span>
          </div>
        ) : null}
        <button onClick={() => setIsModalOpen(true)}>
          {typeOfIcon === "cart" ? (
            <div className="w-6 h-4">
              <CartIcon />
            </div>
          ) : (
            <ShoppingCartIcon />
          )}
        </button>
      </div>
      <ShoppingCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartData={data}
      />
    </>
  );
};

export default ShoppingCart;
