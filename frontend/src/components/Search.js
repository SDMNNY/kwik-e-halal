import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]); 

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    // Here, you would call a function to fetch restaurants based on the search query
    // and update the `restaurants` state
  };

  return (
    <div>
      <h1>Search Page</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for restaurants..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default Search;
