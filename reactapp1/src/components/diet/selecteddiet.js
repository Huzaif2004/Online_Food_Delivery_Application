import React, { useContext, useEffect, useState } from 'react';
import { CityContext } from '../context/CityContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoIcon from '@mui/icons-material/Info';
import Datas from '../Datas/data';
import StarIcon from '@mui/icons-material/Star';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { green, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import { toast } from 'react-toastify';
const SelectedDietPlan = () => {
  const { userDetails } = useContext(CityContext);
  const { cart, setCart } = useContext(CityContext);
  const { menuItems, selectedrestaurant, setMenuItems } = useContext(CityContext);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance(Default)');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const{selectedDietPlan}=useContext(CityContext)
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        if (selectedrestaurant) {
          let url;
          if (filter === 'All') {
            url = `http://localhost:8080/api/menuItems/${selectedrestaurant.hotelId}`;
          } else {
            url = `http://localhost:8080/api/menuitems/${selectedrestaurant.hotelId}?menuType=${filter}`;
          }

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setMenuItems(data);
          } else {
            throw new Error('Response is not an array');
          }
        }
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, [selectedrestaurant, filter, setMenuItems]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userDetails?.id) return;
      try {
        const response = await axios.get(`http://localhost:8080/${userDetails.id}/cart/count`);
        const data = response.data;
        setCart(data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };
    fetchCart();
  }, [userDetails?.id]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setShowFilterModal(false); // Close the modal after selection
  };

  const sortedMenuItems = [...menuItems].sort((a, b) => {
    switch (sortBy) {
      case 'Default':
        return 0; // Default sorting, no change
      case 'Rating':
        return b.rating - a.rating; 
      case 'CostLowtoHigh':
        return a.price - b.price; // Sort by price (lowest first)
      case 'CostHightoLow':
        return b.price - a.price; // Sort by price (highest first)
      default:
        return 0; // Fallback
    }
  });

  return (
    <div >
      
      
     
      
      
      <hr></hr>
      
      {console.log(selectedDietPlan)}
      {selectedDietPlan?.length === 0 ? (
        <p className='no-menus'>No Menu's in {filter}</p>
      ) : (
        selectedDietPlan?.dietMenu.map((item, index) => (
          <MenuItem key={index} item={item} userdetails={userDetails} initialCount={cart[item.id] || 0} />
        ))
      )}
    </div>
    
  );
};

const MenuItem = ({ item, userdetails, initialCount }) => {
  const { selectedmenuItem, setSelectedmenuItem } = useContext(CityContext);
  const [showNutrition, setShowNutrition] = useState(false);
  const [count, setCount] = useState(0);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleAdd = async () => {
    if (!userdetails?.id) {
      alert("You must login");
      return;
    }
    setCount(count + 1);
    toast.success("1 item added to Cart")
    try {
      await axios.post(`http://localhost:8080/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });
      setPopUpMessage("1 item added to Cart");
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 3000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemove = async () => {
    if (count > 0) setCount(count - 1);
    try {
      await axios.put(`http://localhost:8080/${userdetails.id}/cart/decrement`, null, {
        params: { menuItemId: item.id }
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleInfoClick = (menuId) => {
    const menuItem = Datas.find((item) => item.id === menuId);
    setSelectedmenuItem(menuItem);
    setShowNutrition(true);
  };

  const handleClose = () => setShowNutrition(false);

  return (
    <div className="menu-container" id="menulist">
      {showPopUp && 
        <div className="pop-up-message">
          {popUpMessage}
        </div>
      }
        
      <div className="menu-container1">
      
        <div className="menu" key={item.id}>
          <img src={item.menUrl} alt={item.name} />
          <div className="menu-info">
            <div className="menu-info1">
              <h2 className="menu-name">{item.name}</h2>
              <InfoIcon
                className="info-icon"
                onClick={() => handleInfoClick(item.id)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </div>
            <p className="menu-price">
              <CurrencyRupeeIcon />
              {item.price}
            </p>  
            <p className="menu-description">{item.ingredients}</p>
            {count > 0 ? (
              <div className="quantity-controls">
                <button onClick={handleRemove}>-</button>
                <span>{count}</span>
                <button onClick={handleAdd}>+</button>
              </div>
            ) : (
              <button className="add-to-cart-button" onClick={handleAdd}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal show={showNutrition} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nutrition Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedmenuItem ? (
            <>
              <p><b>Calories:</b> {selectedmenuItem.nutrition?.calories} kcal</p>
              <p><b>Protein:</b> {selectedmenuItem.nutrition?.protein} g</p>
              <p><b>Carbs:</b> {selectedmenuItem.nutrition?.carbs} g</p>
              <p><b>Fats:</b> {selectedmenuItem.nutrition?.fats} g</p>
            </>
          ) : (
            <p>No nutrition information available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelectedDietPlan;
