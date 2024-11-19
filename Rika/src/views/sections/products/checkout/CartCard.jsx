import { useState } from "react";
import TrashBinIcon from "../../../../assets/icons/TrashBinIcon";

const CartCard = ({ data }) => {
  const { id, brand, model, price, size, image, quantity } = data;
  const [amount, setAmount] = useState(quantity);

  const updateLocalStorage = (newQuantity) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleSub = () => {
    const newAmount = amount - 1;
    setAmount(newAmount);

    if (amount > 1) {
      updateLocalStorage(newAmount);
    } else {
      removeFromLocalStorage();
    }
  };

  const handleAdd = () => {
    const newAmount = amount + 1;
    setAmount(newAmount);
    updateLocalStorage(newAmount);
  };

  return (
    <div className="flex gap-5 justify-between px-3.5 py-2.5 bg-white rounded-xl shadow-[0px_11px_24px_rgba(0,0,0,0.1)]">
      <div className="flex gap-1.5 text-xs leading-4">
        <img
          src={image}
          alt={`${brand}, ${model}`}
          className="object-contain shrink-0 w-20 rounded-xl aspect-square"
        />
        <div className="my-auto">
          <span className="text-sm font-mont font-medium">{brand}</span>
          <br />
          <span className="text-[#666] font-mont font-medium">{model}</span>
          <br />
          <span className="text-[#666] font-mont font-medium">
            Size: {size}
          </span>
          <br />
          <span className="text-sm font-bold font-mont">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex self-end">
          <button onClick={removeFromLocalStorage}>
            <TrashBinIcon />
          </button>
        </div>
        <div className="flex items-center justify-evenly w-[70px] h-[30px] rounded-[30px] px-1 bg-[#EEEEEE]">
          <button onClick={() => handleSub()}>-</button>
          <span className="font-mont font-medium min-w-5 text-center">
            {amount}
          </span>
          <button onClick={() => handleAdd()}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
