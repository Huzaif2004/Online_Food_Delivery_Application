import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import './AdminSignIn.css'
import { toast } from 'react-toastify';
function AdminSignin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
   
    const navigate=useNavigate()
    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/admin/get')
            const admin = response.data;
            const user = admin.find(
                (user) => user.email === email && user.password === password
              );
            if (user) {
                setSuccess('Login successful');

                
                toast.success('Admin Login Success')
                navigate('/addhotel')
                setError('');
                // Redirect or handle successful login here
            }
            else
              toast.warn('Incorrect email or password')
        } catch (error) {
            console.error('Error signing in:', error);
            setError("Invalid email or password");
            setSuccess('');
        }
    };

    return (
        <div className='signin1-parent'>
        <div className="signin1-container">
            <h2>Admin Signin</h2>
            <form onSubmit={handleSignin}>
                <div className="signin1-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="signin1-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="signin1-error">{error}</p>}
                {success && <p className="signin1-success">{success}</p>}
                <button type="submit" className="signin1-button">Sign In</button>
            </form>
            <div className="signup1-link">
                <p>New to HungryHub? <Link to="/adminsign-up">Sign Up</Link></p>
            </div>
        </div>
        </div>
    );
}

export default AdminSignin;
