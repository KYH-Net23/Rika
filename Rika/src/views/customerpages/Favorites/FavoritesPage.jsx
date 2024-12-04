import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBack from "../../../common/ArrowBack";
import FilledHeartIcon from "../../../assets/icons/FilledHeartIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [timeouts, setTimeouts] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.map((favorite) =>
      favorite.id === id ? { ...favorite, isRemoving: !favorite.isRemoving } : favorite
    );
    setFavorites(updatedFavorites);

    if (timeouts[id]) {
      clearTimeout(timeouts[id]);
      const updatedTimeouts = { ...timeouts };
      delete updatedTimeouts[id];
      setTimeouts(updatedTimeouts);
    } else {
      const timeoutId = setTimeout(() => {
        const filteredFavorites = updatedFavorites.filter((favorite) => favorite.id !== id);
        setFavorites(filteredFavorites);
        localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      }, 1000);

      setTimeouts({ ...timeouts, [id]: timeoutId });
    }
  };

  return (
    <section className="px-4 pt-10 flex flex-col items-center gap-4"> 
        <div className="absolute top-6 left-6"> 
        <ArrowBack goBackTo="/customer" />
        </div>
      <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
        My Favorites
      </h1>
  
      {favorites.length === 0 ? (
        <p>You have no favorites yet!</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center max-w-[1200px]"> 
          {favorites.map((favorite) => (
            <article
              key={favorite.id}
              className="flex flex-col items-center gap-2 relative cursor-pointer w-[150px] bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition"
            >
              <Link to={`/productdetails/${favorite.id}`}>
                <img
                  src={favorite.image}
                  alt={favorite.brand}
                  className="w-full h-[120px] object-cover rounded"
                />
                <h2 className="text-sm font-bold mt-2">{favorite.brand}</h2>
                <p className="text-xs text-gray-500">{favorite.model}</p>
                <p className="text-sm font-bold text-black">${favorite.price}</p>
              </Link>
              <button
                onClick={() => toggleFavorite(favorite.id)}
                className="absolute bottom-2 right-2 bg-transparent"
              >
                {favorite.isRemoving ? <HeartIcon /> : <FilledHeartIcon />}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
   