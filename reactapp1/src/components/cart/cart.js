import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { userDetails, cartItems, setCartItems } = useContext(CityContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const navigate = useNavigate(); // Use navigate to programmatically navigate

  useEffect(() => {
    async function fetchCartItems() {
      if (!userDetails?.id) return; 
      try {
        const response = await axios.get(`http://localhost:8080/${userDetails.id}/cart/items`);
        const items = response.data;
        setCartItems(items);
        calculatePrice(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    if (userDetails?.id) {
      fetchCartItems();
    }
  }, [userDetails?.id]);

  const calculatePrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.count, 0);
    setTotalPrice(total);
  };

  const handleRemoveAll = async () => {
    try {
      await axios.delete(`http://localhost:8080/${userDetails.id}/cart/delete`);
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleItemUpdate = (updatedItems) => {
    setCartItems(updatedItems);
    calculatePrice(updatedItems);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setCheckoutAttempted(true);
    } else {
      navigate('/checkout'); // Redirect to checkout if cart is not empty
    }
  };

  return (
    <div id="custom-cart-box">
      <div id="custom-cart-container">
        <div id="custom-cart-header">
          <h2>Your Cart</h2>
          <a href="#" onClick={handleRemoveAll}>Remove all</a>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              userdetails={userDetails}
              onItemUpdate={handleItemUpdate}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        {checkoutAttempted && cartItems.length === 0 && (
          <p id="custom-empty-cart-message">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
        )}
        <div id="custom-cart-footer">
          <div>
            <p id="custom-total-items">Sub-Total ({cartItems.length} items)</p>
            <p id="custom-subtotal">₹{totalPrice.toFixed(2)}</p>
          </div>
          <button id="custom-checkout-button" onClick={handleCheckout} disabled={cartItems.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, userdetails, onItemUpdate }) {
  const [itemCount, setItemCount] = useState(item.count);
  const { cartItems } = useContext(CityContext);

  useEffect(() => {
    setItemCount(item.count); 
  }, [item.count]);

  async function handleAdd() {
    console.log(item)
    const newItemCount = itemCount + 1;

    // Check if the cart already contains items from a different hotel
    const existingHotelId = cartItems.length > 0 ? cartItems[0].hotelId : null;
    if (existingHotelId && existingHotelId !== item.hotelId) {
      alert('You can only add items from one hotel at a time.');
      return;
    }

    try {
      await axios.post(`http://localhost:8080/${userdetails.id}/cart`, null, {
        params: { menuItemId: item.id }
      });
      setItemCount(newItemCount);
      onItemUpdate((prevItems) => 
        prevItems.map((i) => 
          i.id === item.id ? { ...i, count: newItemCount } : i
        )
      );
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  async function handleRemove() {
    const newItemCount = itemCount - 1;
    if (newItemCount >= 0) {
      try {
        await axios.put(`http://localhost:8080/${userdetails.id}/cart/decrement`, null, {
          params: { menuItemId: item.id }
        });
        if (newItemCount > 0) {
          setItemCount(newItemCount);
          onItemUpdate((prevItems) => 
            prevItems.map((i) => 
              i.id === item.id ? { ...i, count: newItemCount } : i
            )
          );
        } else {
          onItemUpdate((prevItems) => 
            prevItems.filter((i) => i.id !== item.id)
          );
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  }

  return (
    <div id="custom-cart-item">
      <img src={item.imageUrl} alt={item.name} id="custom-cart-item-image" />
      <div id="custom-cart-item-details">
        <h3 id="custom-cart-item-name">{item.name}</h3>
        <p id="custom-cart-item-size">{item.size}</p>
        <p id="custom-cart-item-veg">{item.type}</p>
        <p id="custom-cart-item-price">₹{item.price.toFixed(2)}</p>
      </div>
      <div id="custom-cart-controls">
        <button id="custom-decrement-button" onClick={handleRemove} disabled={itemCount <= 0}>-</button>
        <span id="custom-cart-quantity">{itemCount}</span>
        <button id="custom-increment-button" onClick={handleAdd}>+</button>
      </div>
    </div>
  );
}
