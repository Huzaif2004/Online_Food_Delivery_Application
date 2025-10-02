import React, { useContext, useState, useEffect } from 'react';
import { CityContext } from '../context/CityContext'; // Import your context
import axios from 'axios'
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems,setCartItems, userDetails, totalPrice, setTotalPrice } = useContext(CityContext);

  // Initialize states for form fields
  const [name, setName] = useState(userDetails?.userName || '');
  const [phone, setPhone] = useState(userDetails?.number || '');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  
  // New address form states
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Fetch addresses when the component mounts
  useEffect(() => {
    fetch(`http://localhost:8080/api/users/address/${userDetails.id}`)
      .then(response => response.json())
      .then(data => setAddresses(data))
      .catch(error => console.error('Error fetching addresses:', error));
  }, [userDetails?.id]);

  // Update total price based on cart items
  useEffect(() => {
    setTotalPrice(Object.values(cartItems).reduce((total, item) => total + item.price * item.count, 0));
  }, [cartItems, setTotalPrice]);

  // Handle form submission for new address
  const handleAddAddress = (e) => {
    e.preventDefault();

    const newAddress = {
      addressLine: newAddressLine,
      city: newCity,
      state: newState,
      postalCode: newPostalCode,
    };

    fetch(`http://localhost:8080/api/address/post/${userDetails.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAddress),
    })
      .then(response => response.json())
      .then(data => {
        setAddresses(prevAddresses => [...prevAddresses, data]);
        setIsAddingAddress(false);
        setSelectedAddress(data.id); // Optionally select the newly added address
      })
      .catch(error => console.error('Error adding address:', error));
  };
  const handleOrderSubmission = async () => {
    // Prepare the order data with the correct structure 
    const firstItem = Object.values(cartItems)[0];
    const menuId = firstItem.id;

    const hotelResponse = await axios.get(`http://localhost:8080/api/hotels/hotelIdByMenu/${menuId}`);
        const hotelId = hotelResponse.data;

    console.log(userDetails)
    const orderData = {
        userId: userDetails.id,
        hotelId:hotelId, // Make sure this is the correct hotel ID
        items: cartItems.reduce((acc, item) => {
            acc[item.id] = item.count; // item.id as the key, item.count as the value
            return acc;
        }, {}),
        totalPrice: totalPrice,
    };
    
    console.log('Order Data:', orderData);

    try {
        const response = await axios.post('http://localhost:8080/api/orders/placeOrder', orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Order submitted successfully', response.data);
        await axios.delete(`http://localhost:8080/${userDetails.id}/cart/delete`);
        return response.data.id; // Return the order ID if needed for further operations
    } catch (error) {
        console.error('Failed to submit order:', error);
    }
  };

  
  const sendEmail = (templateId, templateParams) => {
    console.log('hi')
    emailjs.send('service_p89sf0r', templateId, templateParams, 'eNkIxOEvs0mLnGbtT')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        
      }, (error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email');
      });
  };
  
  
  // Example function to send an email
  
  

  // Handle form submission for checkout
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !phone || !selectedAddress) {
      alert('Please fill in all the required details.');
      return;
    }
    
    if (totalPrice === "") {
      alert("Please enter an amount");
      return;
    }
    const formattedItems = Object.values(cartItems).map(item => 
      `${item.name} - ${item.count} x ₹${item.price}`
    ).join('<br/>');
    
    sendEmail('template_cn8duab', {
      from_name:"Hungry Hub",
      to_name: name,
      items: formattedItems,
      total_price: totalPrice,
      to_email: userDetails.email
      
    });
    
    handleOrderSubmission().then(() => {
      console.log('Order submission complete'); // Debugging line
  
      if (window.Razorpay) {
        console.log('Razorpay SDK is loaded'); // Debugging line
  
        const options = {
          key: "rzp_test_xtFnbnQ0oQ9B1o",
          key_secret: "6hJKdPHxGCkjBLvHGzdWjsMK",
          amount: totalPrice * 100,
          currency: "INR",
          name: "Hungry Hub",
          description: "Fastest Delivery",
          handler: function (response) {
            console.log('Payment successful', response); // Debugging line
  
            // Format the items for the email
            
  
            // You can send the order data to your backend here, including selectedAddress
          },
          prefill: {
            name: name,
            email: userDetails?.email,
          },
          notes: {
            address: "Razorpay Corporate office",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        console.log('Opening Razorpay payment window'); // Debugging line
        const pay = new window.Razorpay(options);
        pay.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    });
  };
  
  

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Left Side - Address Selection and New Address Form */}
        <div className="personal-details">
          <h3>Select Delivery Address</h3>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="address-option">
                <input
                  type="radio"
                  id={`address-${address.id}`}
                  name="address"
                  value={address.id}
                  checked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
                />
                <label htmlFor={`address-${address.id}`} className="checkout-label">
                  {`${address.addressLine}, ${address.city}, ${address.state} - ${address.postalCode}`}
                </label>
              </div>
            ))
          ) : (
            <p>Please add one below.</p>
          )}

          <button onClick={() => setIsAddingAddress(true)} className="add-new-address">Add New Address</button>

          {isAddingAddress && (
            <form onSubmit={handleAddAddress} className="new-address-form">
              <input
                type="text"
                value={newAddressLine}
                onChange={(e) => setNewAddressLine(e.target.value)}
                placeholder="Address Line"
                required
              />
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="City"
                required
              />
              <input
                type="text"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                placeholder="State"
                required
              />
              <input
                type="text"
                value={newPostalCode}
                onChange={(e) => setNewPostalCode(e.target.value)}
                placeholder="Postal Code"
                required
              />
              <button type="submit">Save Address</button>
              <button type="button" onClick={() => setIsAddingAddress(false)}>Cancel</button>
            </form>
          )}

          <div className="personal-details-form">
            <h3>Personal Details</h3>
            <input
              type="text"
              className="personal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <input
              type="text"
              className="personal-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        {/* Right Side - Order Summary and Payment Options */}
        <div className="order-payment-details">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {Object.values(cartItems).map((item) => (
                <li key={item.id}>
                  {item.name} x {item.count} = ₹{item.price * item.count}
                </li>
              ))}
            </ul>
            <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          </div>

          {/* Payment Button */}
          <button className="place-order-button" onClick={handleSubmit} disabled={totalPrice===0}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
