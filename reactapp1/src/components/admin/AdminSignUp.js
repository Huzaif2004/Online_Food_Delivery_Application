import React, { useState } from 'react';
import axios from 'axios';
import './AdminSignUp.css'
import { Link } from 'react-router-dom';
function AdminSignup() {
    const [adminName, setAdminName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/admin/signup', {
                adminName,
                email,
                password
            });
            
                console.log(response)
                
           
        } catch (error) {
            console.error('Error registering admin:', error);
            setError("Failed to register admin");
        }
    };

    return (
        <div className='signup-parent'>
        <div className="signup1-container">
            <h2>Admin Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Admin Name:</label>
                    <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
               
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button type="submit" className="submit-button">Sign Up</button>
                <div className="signup1-link">
                <p>Existing User? <Link to="/adminsign-in">Sign In</Link></p>
            </div>
            </form>
        </div>
        </div>
    );
}

export default AdminSignup;
