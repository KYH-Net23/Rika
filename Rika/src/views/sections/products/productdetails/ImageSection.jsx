import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useProductContext } from "../../../../lib/ProductProvider";

const ImageSection = () => {
  const { id } = useParams();
  const { getProductData } = useProductContext();
  const [imageSrc, setImageSrc] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    const fetchAndValidateImage = async () => {
      try {
        const data = await getProductData(id);
        const imageUrl = data.image;
        const productname = data.model;
        const response = await fetch(imageUrl);
        const contentType = response.headers.get("content-type");

        setModel(productname);

        if (response.ok && contentType && contentType.includes("image")) {
          setImageSrc(imageUrl);
        } else {
          setImageSrc("/No_Product_Image_Available.png");
        }
      } catch {
        setModel("Product image not found.");
        setImageSrc("/No_Product_Image_Available.png");
      }
    };

    fetchAndValidateImage();
  }, [id, getProductData]);

  return (
    <>
      <div className="container mx-auto size-1/2">
        <div className="border-solid border-2 aspect-h-4 aspect-w-3 rounded-lg lg:block">
          <img
            src={imageSrc}
            alt={model}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default ImageSection;
