import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackFavoriteIcon from "../../../assets/icons/BlackFavoriteIcon";
import useFavorites from "../../../lib/FavoritesProvider";

const ProductCard = ({ data }) => {
  const { id, brand, image, price, model } = data;
  const [imageSrc, setImageSrc] = useState(image);

  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState(""); 

  useEffect(() => {
    const checkImageUrl = async () => {
      try {
        const response = await fetch(image);
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType.includes("image")) {
          setImageSrc("/No_Product_Image_Available.png");
        }
      } catch {
        setImageSrc("/No_Product_Image_Available.png");
      }
    };

    setIsFavorited(isFavorite(id)); 
    checkImageUrl();
  }, [image, id, isFavorite]);

  const handleClick = () => {
    navigate(`/productdetails/${id}`);
  };

  const handleBrokenImage = () => {
    setImageSrc("/No_Product_Image_Available.png");
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFromFavorites(id);
      setIsFavorited(false);
      setFavoriteMessage("Favorite removed"); 
    } else {
      addToFavorites({ id, brand, image: imageSrc, price, model });
      setIsFavorited(true);
      setFavoriteMessage("Favorite added!"); 
    }

    setTimeout(() => setFavoriteMessage(""), 2000);
  };

  return (
    <article className="flex flex-col items-center justify-center gap-2 relative cursor-pointer">
      <img
        className="w-[155px] h-[177px] filter rounded-2xl object-cover"
        onClick={handleClick}
        src={imageSrc}
        alt={model}
        onError={handleBrokenImage}
      />
      <div className="absolute top-[15px] right-[15px]" onClick={toggleFavorite}>
        <BlackFavoriteIcon isFilled={isFavorited} />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-black font-mont text-[14px] font-semibold">
          {brand}
        </h2>
        <p className="text-[#666] font-mont font-semibold text-[11px]">
          {model}
        </p>
        <h2 className="text-black font-mont text-[14px] font-semibold">
          ${price.toFixed(2)}
        </h2>
      </div>
      {favoriteMessage && (
        <div className="absolute top-[-60px] left-[140px] bg-black text-white text-sm p-2 rounded">
          {favoriteMessage}
        </div>
      )}
    </article>
  );
};

export default ProductCard;
