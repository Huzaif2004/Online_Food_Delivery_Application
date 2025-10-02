import './App.css';
import './css/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/navbar.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Login from './components/login';
import './css/signup.css'
import './css/home.css'
import './css/header.css'
import HomePage from './components/home';
import Signup from './components/signup';
import './css/restaurants.css'
import './css/menuhotels.css'
import './css/offers.css'
import RestaurantList from './components/restaurants';
import MenuList from './components/menu/menuhotels';
import Footer from './components/footer';
import Offers from './components/offers';
import Cart from './components/cart/cart';
import './css/cart.css'
import Search from './components/search';
import NavScrollExample from './components/navbar';
import Checkout from './components/cart/checkout.js';
import ProfilePage from './components/profile.js';
import DietPlansComponent from './components/diet/healthy.js';
import './css/checkout.css';
import SelectedDiet from './components/diet/selecteddiet.js';
import { ToastContainer } from 'react-toastify';
import './css/healthy.css'; 
import './css/addHotel.css'
import AddHotel from './components/hotels/addHotels.js';
import OrderDetails from './components/orders.js';
import DeleteMenu from './components/hotels/delete.js';
import AdminSignin from './components/admin/AdminSignIn.js';
import AdminSignup from './components/admin/AdminSignUp.js';
function App() {
  return (
    <Router>
      <div>
        <NavScrollExample /> {/* Now wrapped inside Router */}
        
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reslist' element={<RestaurantList />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menulist' element={<MenuList />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<Search />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={< ProfilePage/>} />
          <Route path='/diet' element={< DietPlansComponent/>} />
          <Route path='/seldiet' element={< SelectedDiet/>} />
          <Route path='/addhotel' element={< AddHotel/>} />
          <Route path='/order' element={< OrderDetails/>} />
          <Route path='/delete' element={< DeleteMenu/>} />
          <Route path='/adminsign-in' element={<AdminSignin/>} />
          <Route path='/adminsign-up' element={<AdminSignup/>} />

        </Routes>
        
       
      </div>
    </Router>
  );
}

export default App;
