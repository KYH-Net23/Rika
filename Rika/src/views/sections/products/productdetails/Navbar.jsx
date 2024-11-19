import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../../lib/AuthProvider";
import { useProductContext } from "../../../../lib/ProductProvider";

import ArrowBack from "../../../../common/ArrowBack";
import ShoppingCart from "../checkout/cart/ShoppingCart";
import EditButton from "../../../../common/EditButton";
import DeleteModal from "../../../../common/delete/DeleteModal";
import DeleteButton from "../../../../common/delete/DeleteButton";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteProduct } = useProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let admin = false;
  const { userRole, isAuthenticated, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    const authorizeUser = async () => {
      await checkAuth();
    };

    authorizeUser();
  }, [checkAuth]);

  const handleDelete = async () => {
    try {
      const deletion = await deleteProduct(id);
      if (deletion) {
        navigate("/products?delete=success");
      }
    } catch (err) {
      alert("Fail");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (isAuthenticated && userRole === "Admin") {
    admin = true;
  }

  return (
    <div className="flex">
      <div className="flex-none">
        <ArrowBack goBackTo="/products" />
      </div>

      <div className="grow"></div>
      <div className="gap-6 flex">
        {admin ? (
          <div>
            <div className="pb-1 space-x-1">
              <EditButton label="Edit Product" productId={id} />
              <DeleteButton clickFunction={() => setIsModalOpen(true)} />
            </div>
            <DeleteModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDelete}
              modelMessage={
                "Do you really want to delete this item? This action cannot be undone."
              }
            />
          </div>
        ) : (
          <ShoppingCart />
        )}
      </div>
    </div>
  );
};

export default Navbar;
