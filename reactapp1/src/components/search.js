import React, { useContext, useState } from 'react';
import { CityContext } from './context/CityContext';
import { Link } from 'react-router-dom';
import MenuList from './menu/menuhotels';
import SearchMenu from './menu/searchMenu';
import StarIcon from '@mui/icons-material/Star';
import '../css/search.css'
const Search = () => {
  const { hotels } = useContext(CityContext);
  const [view, setView] = useState('restaurants');
  const { isSearch } = useContext(CityContext);
  const{setSelectedRestaurant}=useContext(CityContext)
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    
    
  };
  return (
    <div>
      <div className="toggle-buttons">
        <button onClick={() => setView('restaurants')}>Restaurants</button>
        <button onClick={() => setView('menus')}>Menus</button>
      </div>

      {isSearch && view === 'restaurants' && (
        <div>
          <div className="search-container" id="reslist">
            <h3 style={{ marginLeft: '47px', marginTop: '30px' }}>Top Restaurants</h3>
            <div className='restaurant-container1'>
              {Array.isArray(hotels) && hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <div className='restaurant' key={hotel.hotelId}>
                    <Link to='/menulist'>
                      <img 
                        src={hotel.hotelUrl} 
                        alt={hotel.hotelName} 
                        onClick={() => handleRestaurantClick(hotel)} 
                      />
                    </Link>
                    <div className="restaurant-info">
                      <h2 className="restaurant-name">{hotel.hotelName}</h2>
                      <p className="restaurant-rating">
                      <StarIcon style={{ color: 'green', height: '20px' }} />
                        {hotel.rating}
                      </p>
                      <p className="hotel-location">{hotel.hotelLocation}</p>
                      <p className="hotel-description">{hotel.style}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hotels found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {isSearch && view === 'menus' && <SearchMenu />}
    </div>
  );
};

export default Search;
