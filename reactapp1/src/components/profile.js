import React, { useContext, useState } from 'react';
import '../css/profilepage.css';
import { CityContext } from './context/CityContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
const ProfilePage = () => {
    const { userDetails,setUserDetails} = useContext(CityContext);
    const { setisloggedin } = useContext(CityContext);
    const navigate = useNavigate();

    const [editField, setEditField] = useState(null);
    const [newValues, setNewValues] = useState({
        userName: userDetails.userName,
        email: userDetails.email,
        number: userDetails.number,
    });

    const handleLogout = () => {
        setisloggedin(false);
        navigate('/login');
    };

    const handleOrders = () => {
        navigate('/order');
    };

    const handleEdit = (field) => {
        setEditField(field);
    };

    // Import axios for making HTTP requests
    const handleSave = (field) => {
        let endpoint = '';
        console.log(userDetails)
        if (field === 'userName') {
            endpoint = `http://localhost:8080/editusers/${userDetails.id}/username?userName=${newValues.userName}`;
        } else if (field === 'email') {
            endpoint = `http://localhost:8080/editusers/${userDetails.id}/email?email=${newValues.email}`;
        } else if (field === 'number') {
            endpoint = `http://localhost:8080/editusers/${userDetails.id}/phonenumber?phoneNumber=${newValues.number}`;
        }
    
        axios.put(endpoint)
            .then(response => {
                console.log('User updated:', response.data);
                setUserDetails(response.data);
                setEditField(null);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    // Show a toast notification with the error message
                    toast.error(error.response.data.message);
                }
                else{
                console.error('There was an error updating the user!', error);}
            });
    };
    
    

    const handleChange = (e) => {
        setNewValues({
            ...newValues,
            [e.target.name]: e.target.value,
        });
    };

    if (!userDetails) {
        return null;
    }

    return (
        <div className="profile-box">
            <div className="profile-container">
                <div className="sidebar">
                    <h2>Hello {userDetails.userName}</h2>
                    <ul>
                        <li className="active">Account Information</li>
                        <li onClick={handleOrders}>My Orders</li>
                        <li>Address Book</li>
                        <li>Change Password</li>
                        <li onClick={handleLogout}>Log Out</li>
                    </ul>
                </div>
                <div className="content">
                    <h2>Account Information</h2>
                    <p className="required-fields">* Required Fields</p>
                    <div className="account-details">
                        <div className="detail-label">
                            <p>User Name </p>
                            <p>Email Address</p>
                            <p>Phone Number</p>
                        </div>
                        <div className="detail-value">
                            {editField === 'userName' ? (
                                <>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={newValues.userName}
                                        onChange={handleChange}
                                    />
                                    <button onClick={() => handleSave('userName')} style={{margin:"5px"}}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>{newValues.userName}</p>
                                    <button onClick={() => handleEdit('userName')}>Edit</button>
                                </>
                            )}
                            {editField === 'email' ? (
                                <>
                                    <input
                                        type="text"
                                        name="email"
                                        value={newValues.email}
                                        onChange={handleChange}
                                    />
                                    <button onClick={() => handleSave('email')}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>{newValues.email}</p>
                                    <button onClick={() => handleEdit('email')}>Edit</button>
                                </>
                            )}
                            {editField === 'number' ? (
                                <>
                                    <input
                                        type="text"
                                        name="number"
                                        value={newValues.number}
                                        onChange={handleChange}
                                    />
                                    <button onClick={() => handleSave('number')}>Save</button>
                                </>
                            ) : (
                                <>
                                    <p>{newValues.number}</p>
                                    <button onClick={() => handleEdit('number')}>Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
