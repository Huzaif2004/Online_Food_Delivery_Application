import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { CityContext } from './context/CityContext';
const Offers = () => {
  const[offers,setOffers]=useState([]) 
  const{setSelectedRestaurant}=useContext(CityContext)
  useEffect(()=>
  {
      const fetchMenus=async()=>{
        try{
          const response=await fetch(`http://localhost:8080/api/gethotels/offers`)
          if(!response.ok)
          {
            throw new Error('Network response was not ok');
          }
          const data=await response.json();
          if (Array.isArray(data)) {
            setOffers(data);
          } else {
            throw new Error('Response is not an array');
          } 
        }
        catch (error) {
            console.error('Error fetching restaurants:', error);
          }

      }
      fetchMenus();
  },[])  
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    
    
  };
  return (
    <div className="offers-container" id="reslist">
      <h3 style={{ marginLeft: '47px',marginTop:'30px'}}>Top Restaurants with Offers</h3>
      <div className='offers-container1'>
        {offers.map((offer) => (
          <div className='offers' key={offer.hotelId}>
            <Link to='/menulist'>
              <img 
                src={offer.hotelUrl} 
                alt={offer.hotelName} 
                onClick={() => handleRestaurantClick(offer)} 
              />
            </Link>
            <div className="offers-info">
              <h2 className="offers-name">{offer.hotelName}</h2>
              <p className="offers-rating">
                <StarIcon style={{ color: 'green', height: '20px' }} />
                {offer.rating}
              </p>
              <p className="offers-location">{offer.hotelLocation}</p>
              <p className="offers-description">{offer.style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Offers
