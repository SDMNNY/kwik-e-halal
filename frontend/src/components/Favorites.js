import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    // Here, you would call a function to fetch the user's favorite restaurants
    // and update the `favorites` state
  }, []);

  return (
    <div>
      <h1>Favorites Page</h1>
      <div>
        {favorites.map((favorite) => (
          <RestaurantCard key={favorite.id} restaurant={favorite} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
