import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [notFound, setNotFound] = useState(false);
  // GET ONE
  const getProductData = async (id) => {
    try {
      const response = await fetch(
        `https://rika-kyh23net-products.azurewebsites.net/api/getproducts/${id}`
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      const updatedData = Object.fromEntries(
        Object.entries(result).map(([key, value]) => [key, value ?? ""])
      );
      return updatedData;
    } catch (err) {
      console.log(err);
      setNotFound(true);
      return {};
    }
  };

  // GET ALL
  const getProductsData = async () => {
    const res = await fetch(
      "https://rika-kyh23net-products.azurewebsites.net/api/getproducts/"
    );
    return await res.json();
  };

  // UPDATE
  const isValidImageURL = (url) => {
    const onlineImagePattern =
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg))$/i;
    const standaloneImagePattern =
      /^(?=.{1,})(?:.*[\\\/])?.+\.(?:png|jpg|jpeg|gif|bmp|webp|tiff|svg)$/i;
    return onlineImagePattern.test(url) || standaloneImagePattern.test(url);
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.brand) errors.brand = "Brand is required.";
    if (!formData.model) errors.model = "Model is required.";
    if (!formData.price) errors.price = "Price is required.";
    if (isNaN(formData.price) || formData.price <= 0)
      errors.price = "Price must be a positive number.";
    if (!formData.stock) errors.stock = "Stock is required.";
    if (isNaN(formData.stock) || formData.stock < 0)
      errors.stock = "Stock cannot be negative.";
    if (!formData.image) {
      errors.image = "Image URL is required.";
    } else if (!isValidImageURL(formData.image)) {
      errors.image =
        "Image URL must be a valid image format (JPEG, PNG, GIF, etc.).";
    }
    return errors;
  };

  const updateProduct = async (id, formData) => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      return validationErrors;
    } else {
      try {
        const response = await fetch(
          `https://rika-kyh23net-products.azurewebsites.net/api/updateproduct/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const responseJson = await response.json();
          console.log(responseJson);
          return {}; // No errors, indicating a successful update
        } else {
          console.error("Error updating product:", response.statusText);
          return { general: "Failed to update product. Please try again." };
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        return {
          general: "Network error occurred. Please check your connection.",
        };
      }
    }
  };

  // ADD/CREATE

  const postProductsAsync = async (productData) => {
    try {
      const response = await fetch(
        "https://rika-kyh23net-products.azurewebsites.net/api/createproduct/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.ok;
    } catch (error) {
      console.error("Error posting product:", error);
      return null;
    }
  };

  // DELETE

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://rika-kyh23net-products.azurewebsites.net/api/deleteproduct/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete product: ${response.status} ${response.statusText}`
        );
      }
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      return false;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProductData,
        getProductsData,
        updateProduct,
        postProductsAsync,
        deleteProduct,
        notFound,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
