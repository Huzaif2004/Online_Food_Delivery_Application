import React, { useContext, useEffect, useState } from 'react';
import { CityContext } from './context/CityContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoIcon from '@mui/icons-material/Info';
import Datas from './data';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { green, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
const Type = () => { 
  const { userDetails } = useContext(CityContext);
  const [cart, setCart] = useState({});
  const { menuItems, selectedrestaurant, setMenuItems } = useContext(CityContext);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        if (selectedrestaurant) {
          const response = await fetch(`http://localhost:8080/api/menuItems/${selectedrestaurant.hotelId}`);
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
  }, [selectedrestaurant, setMenuItems]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!userDetails?.id) return;

      try {
        const response = await axios.get(`http://localhost:8080/${userDetails.id}/cart/count`);
        if (response.status !== 200) {
          throw new Error("There is a problem");
        }
        const data = response.data;
        setCart(data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchCart();
  }, [userDetails?.id]);

  // useEffect(() => {
  //   const fetchMenuByType = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8080/api/menuItems', {
  //         params: { type: filter }
  //       });
  //       const data = res.data;
  //       console.log(data);
       
  //     } catch (error) {
  //       console.error('Error fetching items', error);
  //     }
  //   };

  //   fetchMenuByType();
  // }, [filter, setMenuItems]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div>
      <div className="filter-buttons">
        <button 
          className={`filter-button ${filter === 'Veg' ? 'active veg' : ''}`}
          onClick={() => handleFilterChange('Veg')}
        >
          Veg
        </button>
        <button 
          className={`filter-button ${filter === 'Non-Veg' ? 'active non-veg' : ''}`}
          onClick={() => handleFilterChange('Non-Veg')}
        >
          Non-Veg
        </button>
        <button 
          className={`filter-button ${filter === 'All' ? 'active all' : ''}`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
      </div>
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} userdetails={userDetails} initialCount={cart[item.id] || 0} />
      ))}
    </div>
  );
};
const MenuItem = ({ item, userdetails, initialCount }) => {
  const { selectedmenuItem, setSelectedmenuItem, menuItems } = useContext(CityContext);
  const [showNutrition, setShowNutrition] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  const handleAdd = async () => {
    if (!userdetails?.id) {
      alert("You must login");
      return;
    }

    setCount(count + 1);
    try {
      await axios.post(`http://localhost:8080/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleRemove = async () => {
    if (count > 0) 
    setCount(count - 1);
    try {
      await axios.put(`http://localhost:8080/${userdetails.id}/cart/decrement`, null, {
        params: { menuItemId: item.id }
      });
      console.log("item removed from cart");
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
      <div className="menu-container1">
        <div className="menu" key={item.id}>
          <img src={item.imageUrl} alt={item.name} />
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
            <p className="menu-description">{item.description}</p>
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
              <p><b>Sugars:</b> {selectedmenuItem.nutrition?.sugars} g</p>
              <p><b>Fiber:</b> {selectedmenuItem.nutrition?.fiber} g</p>
              <p><b>Fat:</b> {selectedmenuItem.nutrition?.fat} g</p>
              <p><b>Saturated Fat:</b> {selectedmenuItem.nutrition?.saturatedFat} g</p>
              <p><b>Trans Fat:</b> {selectedmenuItem.nutrition?.transFat} g</p>
              <p><b>Cholesterol:</b> {selectedmenuItem.nutrition?.cholesterol} mg</p>
              <p><b>Sodium:</b> {selectedmenuItem.nutrition?.sodium} mg</p>
              <p><b>Potassium:</b> {selectedmenuItem.nutrition?.potassium} mg</p>
              <p><b>Vitamin A:</b> {selectedmenuItem.nutrition?.vitaminA} %</p>
              <p><b>Vitamin C:</b> {selectedmenuItem.nutrition?.vitaminC} %</p>
              <p><b>Calcium:</b> {selectedmenuItem.nutrition?.calcium} %</p>
              <p><b>Iron:</b> {selectedmenuItem.nutrition?.iron} %</p>
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

export default Type;
