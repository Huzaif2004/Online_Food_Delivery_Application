import React from 'react'
import Home1 from './header'
import Items from './Items'
import Header from './header'
import ItemsMenu from './Items'
import RestaurantList from './restaurants'
import Menuhotels from './menu/menuhotels'
import Footer from './footer'
import VoiceSearch from './voiceSearch'
import PromoCarousel from './carosel'
import Carosel from './carosel'
import DietPlan from './diet/healthy'
import { ToastContainer } from 'react-toastify'
import OrderDetails from './orders'
const HomePage = () => {
  const handleSearch = (query) => {
    // Implement the search functionality here based on the query
    console.log('Searching for:', query);
    // Example: Filter the menu items or hotels based on the query
  };
  return (
    <div>
         
         <Header/>
         <ItemsMenu/>
         <Carosel/>
         {/* <PromoCarousel/> */}
         <RestaurantList/>
         <DietPlan/>
         {/* <VoiceSearch onSearch={handleSearch} /> */}
         {/* <OrderDetails/> */}
         <Footer />
         



    </div>
  )
}

export default HomePage