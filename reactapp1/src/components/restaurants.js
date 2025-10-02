import React, { useContext, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { CityContext } from './context/CityContext';
import { Link } from 'react-router-dom';

const RestaurantList = () => {
  const { city, setSelectedRestaurant,setRestaurants, restaurants } = useContext(CityContext);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log(city);
        const response = await fetch(`http://localhost:8080/api/gethotels/${city}`); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          throw new Error('Response is not an array');
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [city]);
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    
    
  };

  return (
    <div className="restaurant-container" id="reslist">
      <h3 style={{ marginLeft: '47px',marginTop:'30px'}}>Top Restaurants in {city}</h3>
      <div className='restaurant-container1'>
        {restaurants.map((restaurant) => (
          <div className='restaurant' key={restaurant.hotelId}>
            <Link to='/menulist'>
              <img 
                src={restaurant.hotelUrl} 
                alt={restaurant.hotelName} 
                onClick={() => handleRestaurantClick(restaurant)} // Set the whole restaurant object
              />
            </Link>
            <div className="restaurant-info">
              <h2 className="restaurant-name">{restaurant.hotelName}</h2>
              <p className="restaurant-rating">
                <StarIcon style={{ color: 'green', height: '20px' }} />
                {restaurant.rating}
              </p>
              <p className="hotel-location">{restaurant.hotelLocation}</p>
              <p className="hotel-description">{restaurant.style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
