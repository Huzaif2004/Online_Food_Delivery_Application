import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CityContext } from './context/CityContext';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState({});
  const { userDetails } = useContext(CityContext);

  useEffect(() => {
    // Fetch orders by user ID
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/user/${userDetails.id}`);
        const orders = response.data;
        setOrders(orders);

        // Extract all unique menu item IDs
        const menuItemIds = new Set();
        orders.forEach(order => {
          Object.keys(order.items).forEach(menuItemId => menuItemIds.add(menuItemId));
        });

        // Fetch menu item details for each ID
        const fetchMenuItems = async () => {
          const menuItemsData = {};
          await Promise.all(Array.from(menuItemIds).map(async id => {
            const menuItemResponse = await axios.get(`http://localhost:8080/api/menu/${id}`);
            console.log(menuItemResponse)
            menuItemsData[id] = menuItemResponse.data;
          }));
          setMenuItems(menuItemsData);
        };

        fetchMenuItems();
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userDetails?.id]);
  useEffect(()=>{
    console.log(orders)
  },[orders])

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Order History</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={styles.order}>
            <h3 style={styles.hotelName}>{order.hotelModel.hotelName}</h3>
            <p style={styles.orderDate}>{new Date(order.orderDate).toLocaleString()}</p>
            <p style={styles.totalPrice}>Total: ₹{order.totalPrice}</p>
            <div style={styles.itemsContainer}>
              {Object.entries(order.items).map(([itemId, quantity]) => {
                const menuItem = menuItems[itemId];
                return menuItem ? (
                  <div key={itemId} style={styles.menuItem}>
                    <img src={menuItem.imageUrl} alt={menuItem.name} style={styles.image} />
                    <div style={styles.itemDetails}>
                      <p style={styles.itemName}>{menuItem.name}</p>
                      <p style={styles.itemPrice}>₹{menuItem.price} x {quantity}</p>
                      <p style={styles.itemDescription}>{menuItem.description}</p>
                    </div>
                  </div>
                ) : (
                  <p key={itemId} style={styles.loadingItem}>Loading item details...</p>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '30px auto',
    padding: '25px',
    backgroundColor: '#fdfdfd',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: 'black',
    borderBottom: '2px solid #ddd',
    paddingBottom: '15px',
    fontWeight: '600',
  },
  noOrders: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#999',
  },
  order: {
    marginBottom: '25px',
    padding: '20px',
    backgroundColor: '#f6f6f6',
    borderRadius: '10px',
    border: '1px solid #ddd',
  },
  hotelName: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: '14px',
    color: '#777',
    fontStyle: 'italic',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111',
    marginTop: '15px',
  },
  itemsContainer: {
    marginTop: '15px',
    paddingLeft: '10px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e5e5',
  },
  image: {
    width: '90px',
    height: '90px',
    borderRadius: '8px',
    marginRight: '20px',
    objectFit: 'cover',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555',
    marginTop: '8px',
  },
  itemDescription: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
    lineHeight: '1.5',
  },
  loadingItem: {
    color: '#bbb',
    fontStyle: 'italic',
  },
};


export default OrderDetails;
