import { useEffect, useState } from "react";
import ImageSection from "./sections/products/productdetails/ImageSection";
import Navbar from "./sections/products/productdetails/NavBar";
import Detailssection from "./sections/products/productdetails/Detailssection";
import { useProductContext } from "../lib/ProductProvider";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductData } = useProductContext();
  const [productDetails, setProductDetails] = useState({
    brand: "",
    model: "",
    description: "",
    price: 0,
    image: "",
    size: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      const data = await getProductData(id);
      setProductDetails(data);
      setIsLoading(false);
    };
    if (!productDetails.brand) {
      fetchProductDetails();
    }
  }, [id, productDetails.brand, getProductData]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ImageSection productImage={productDetails.image} />
          <Detailssection productDetails={productDetails} />
        </>
      )}
    </>
  );
};

export default ProductDetails;
