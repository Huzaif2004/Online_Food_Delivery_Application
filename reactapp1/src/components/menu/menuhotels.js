import React, { useContext, useEffect, useState } from 'react';
import { CityContext } from '../context/CityContext';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InfoIcon from '@mui/icons-material/Info';
import Datas from '../Datas/data';
import StarIcon from '@mui/icons-material/Star';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { green } from '@mui/material/colors';
import e from 'cors';

const MenuList = () => {
  const { userDetails } = useContext(CityContext);
  const { cart, setCart } = useContext(CityContext);
  const { menuItems, selectedrestaurant, setMenuItems } = useContext(CityContext);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Relevance(Default)');
  const [showFilterModal, setShowFilterModal] = useState(false);

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
    <div>
      <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <div>
                <Form.Check 
                  type="radio" 
                  label="Default" 
                  value="Default" 
                  checked={sortBy === 'Relevance(Default)'}
                  onChange={handleSortChange} 
                />
                <Form.Check 
                  type="radio" 
                  label="Rating" 
                  value="Rating" 
                  checked={sortBy === 'Rating'}
                  onChange={handleSortChange} 
                />
                <Form.Check 
                  type="radio" 
                  label="Cost: Low to High" 
                  value="CostLowtoHigh" 
                  checked={sortBy === 'CostLowtoHigh'}
                  onChange={handleSortChange} 
                />
                <Form.Check 
                  type="radio" 
                  label="Cost: High to Low" 
                  value="CostHightoLow" 
                  checked={sortBy === 'CostHightoLow'}
                  onChange={handleSortChange} 
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Clear Filters
          </Button>
          <Button variant="primary" onClick={() => setShowFilterModal(false)}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='parent-container'>
        <div className="restaurant-card">
          <div>
            <img src={selectedrestaurant?.hotelUrl} alt={selectedrestaurant?.hotelName} />
          </div>
          <div>
            <h2 className="restaurant-name"><b>{selectedrestaurant?.hotelName}</b></h2>
            <div className="res-info">
              <div className="rating">
                <span><b>{selectedrestaurant?.rating}</b></span> (10K+ ratings)
              </div>
              <div className="price">₹600 for two</div>
            </div>
            <div className="cuisine">{selectedrestaurant?.style}</div>
            <div className="details">
              <span><b>Outlet:</b> {selectedrestaurant?.hotelLocation}</span>
              <span><b>Delivery:</b> 15-20 mins</span>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-buttons">
        <Button onClick={() => setShowFilterModal(true)}>Filter</Button>
        <button 
          className={`filter-button ${filter === 'Veg' ? 'active veg' : ''}`}
          onClick={() => handleFilterChange('Veg')}
        >
          Veg
        </button>
        <button 
          className={`filter-button ${filter === 'Non-Veg' ? 'active non-veg' : ''}`}
          onClick={() => handleFilterChange('Non Veg')}
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
      <div style={{textAlign:"center"}}>
        <h3>Menu's</h3>
      </div>
      <hr />
      {console.log(selectedrestaurant)}
      {sortedMenuItems.length === 0 ? (
        <p className='no-menus'>No Menu's in {filter}</p>
      ) : (
        sortedMenuItems.map((item, index) => (
          <MenuItem 
            key={index} 
            item={item} 
            userdetails={userDetails} 
            cart={cart} 
            selectedrestaurant={selectedrestaurant} 
            initialCount={cart[item.id] || 0} 
          />
        ))
      )}
    </div>
  );
};

const MenuItem = ({ item, userdetails, initialCount, cart, selectedrestaurant }) => {
  const { selectedmenuItem, setSelectedmenuItem } = useContext(CityContext);
  const [cartItems, setCartItems] = useState([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [showReplaceCartModal, setShowReplaceCartModal] = useState(false);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    async function fetchCartItems() {
      if (!userdetails?.id) return; 
      try {
        const response = await axios.get(`http://localhost:8080/${userdetails.id}/cart/items`);
        const items = response.data;
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    if (userdetails?.id) {
      fetchCartItems();
    }
  }, [userdetails?.id]);

  const handleAdd = async () => {
    if (!userdetails?.id) {
      alert("You must log in.");
      return;
    }
    if(cartItems.length===0){
    addCart();}
    else{
    
    const firstItem = Object.values(cartItems)[0];
    const menuId = firstItem?.id;
    const hotelResponse = await axios.get(`http://localhost:8080/api/hotels/hotelIdByMenu/${menuId}`);
    const hotelId = hotelResponse.data;

    if (hotelId && hotelId !== selectedrestaurant.hotelId) {
      setShowReplaceCartModal(true);
      return;
    }
    addCart();}
    
  };
  const addCart=async()=>{

    setCount(count + 1);
    toast.success("1 item added to Cart");

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

  }
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

  const replaceCart = async () => {
    setShowReplaceCartModal(false);

    try {
      // Clear the existing cart
      await axios.delete(`http://localhost:8080/${userdetails.id}/cart/delete`);

      // Add the new item to the cart
      await axios.post(`http://localhost:8080/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });

      // Update the cart state
      setCartItems([item]); // Assuming `item` is the new item to be added
      toast.success("Cart replaced with new items from the selected restaurant");
    } catch (error) {
      console.error('Error replacing cart:', error);
    }
  };

  return (
    <div className="menu-container" id="menulist">
      {showPopUp && 
        <div className="pop-up-message">
          {popUpMessage}
        </div>
      }
      
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
            <p className="menu-rating">
              <StarIcon style={{ color: green[500], height: '20px' }} />
              {item.rating}
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
              <p><b>Fats:</b> {selectedmenuItem.nutrition?.fat} g</p>
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

      <Modal show={showReplaceCartModal} onHide={() => setShowReplaceCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Replace Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your cart contains items from a different hotel. Do you want to replace the cart with items from {selectedrestaurant.hotelName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplaceCartModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={replaceCart}>Replace</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuList;
