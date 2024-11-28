import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../lib/AuthProvider";

import CartIcon from "../../../assets/icons/CartIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import NotificationIcon from "../../../assets/icons/NotificationIcon";
import ProfileIcon from "../../../assets/icons/ProfileIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";

const Header = () => {
  const navigate = useNavigate();
  const { userRole, isAuthenticated } = useContext(UserContext);

  const handleClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/checkout");
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (userRole === "Customer") {
      navigate("/customer");
    } else if (userRole === "Admin") {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  const handleProductClick = () => {
    navigate("/products");
  };

  return (
    <header className="fixed bottom-0 flex bg-white w-full min-h-[70px] rounded-[30px_30px_0px_0px] shadow-[0px_-2px_7px_rgba(0,0,0,0.1)] z-50">
      <div className="flex gap-14 w-full items-center justify-center">
        <button
          onClick={handleClick}
          className="flex gap-1 bg-[#EEEEEE] rounded-[30px] my-auto pr-2 items-center cursor-pointer"
        >
          <HomeIcon />
          <p className="font-mont text-[11px] font-semibold">Home</p>
        </button>
        <nav className="flex items-center gap-14">
          <button onClick={handleCartClick}>
            <a className="cursor-pointer">
              <CartIcon />
            </a>
          </button>
          <button onClick={handleProductClick}>
            <a className="cursor-pointer">
              <ProductIcon />
            </a>
          </button>
          <button onClick={handleProfileClick}>
            <a className="cursor-pointer">
              <ProfileIcon />
            </a>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
