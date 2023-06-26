import React from 'react';

function RestaurantCard({ restaurant }) {
  return (
    <div>
      {/* This is where you'll display restaurant details */}
      <h2>{restaurant.name}</h2> {/* The restaurant's name */}
      <p>{restaurant.address}</p> {/* The restaurant's address */}
      {/* and so on */}
    </div>
  );
}

export default RestaurantCard; // This makes the RestaurantCard component importable in other files
