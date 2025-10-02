import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 // Import the CSS file

const AddHotel = () => {
  const [hotel, setHotel] = useState({
    hotelName: '',
    hotelLocation: '',
    hotelUrl: '',
    style: '',
    rating: '',
    city: '',
    offers: '',
    menuItems: []
  });

  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    type: '',
    rating: 0
  });

  const [showMenuFields, setShowMenuFields] = useState(false);

  const addMenuItem = () => {
    setHotel({
      ...hotel,
      menuItems: [...hotel.menuItems, menuItem]
    });
    setMenuItem({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      type: '',
      rating: 0
    });
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/post', hotel);
      alert('Hotel and Menu Items added successfully!');
    } catch (error) {
      console.error('Error adding hotel and menu items!', error);
    }
  };

  return (
    <div className='parent-form1'>
    <div className='form1-container'>
      <form onSubmit={handleSubmit}>
        <h2>Add Hotel</h2>
        <input type="text" name="hotelName" value={hotel.hotelName} onChange={handleHotelChange} placeholder="Hotel Name" required />
        <input type="text" name="hotelLocation" value={hotel.hotelLocation} onChange={handleHotelChange} placeholder="Hotel Location" required />
        <input type="text" name="hotelUrl" value={hotel.hotelUrl} onChange={handleHotelChange} placeholder="Hotel URL" required />
        <input type="text" name="style" value={hotel.style} onChange={handleHotelChange} placeholder="Style" />
        <input type="text" name="rating" value={hotel.rating} onChange={handleHotelChange} placeholder="Rating" />
        <input type="text" name="city" value={hotel.city} onChange={handleHotelChange} placeholder="City" />
        <input type="text" name="offers" value={hotel.offers} onChange={handleHotelChange} placeholder="Offers" />

        <button type="button" className="toggle-menu-fields" onClick={() => setShowMenuFields(!showMenuFields)}>
          {showMenuFields ? 'Hide Menu Items' : 'Add Menu Items'}
        </button>

        {showMenuFields && (
          <>
            <h3>Menu Items</h3>
            <input type="text" name="name" value={menuItem.name} onChange={handleMenuItemChange} placeholder="Menu Item Name" required />
            <input type="text" name="description" value={menuItem.description} onChange={handleMenuItemChange} placeholder="Description" required />
            <input type="text" name="imageUrl" value={menuItem.imageUrl} onChange={handleMenuItemChange} placeholder="Image URL" />
            <input type="number" name="price" value={menuItem.price} onChange={handleMenuItemChange} placeholder="Price" required />
            <input type="text" name="type" value={menuItem.type} onChange={handleMenuItemChange} placeholder="Type" />
            <input type="number" name="rating" value={menuItem.rating} onChange={handleMenuItemChange} placeholder="Rating" />

            <button type="button" className="add-menu-item-button" onClick={addMenuItem}>Add Menu Item</button>
          </>
        )}

        <button type="submit" className="submit-button">Submit Hotel</button>
        <Link to='/delete' className="delete-link">Delete Menus</Link>
      </form>
    </div>
    </div>
  );
};

export default AddHotel;
