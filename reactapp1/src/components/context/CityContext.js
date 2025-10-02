import React, { createContext, useState, useEffect } from 'react';

const CityContext = createContext();

const CityProvider = ({ children }) => {
  const [dietPlans, setDietPlans] = useState(() => {
    const saved = localStorage.getItem('dietPlans');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDietPlan, setSelectedDietPlan] = useState(() => {
    const saved = localStorage.getItem('selectedDietPlan');
    return saved ? JSON.parse(saved) : [];
  });
  const [city, setCity] = useState(() => localStorage.getItem('city') || 'Coimbatore');
  const [restaurants, setRestaurants] = useState(() => {
    const saved = localStorage.getItem('restaurants');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedrestaurant, setSelectedRestaurant] = useState(() => {
    const saved = localStorage.getItem('selectedrestaurant');
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedmenuItem, setSelectedmenuItem] = useState(() => {
    const saved = localStorage.getItem('selectedmenuItem');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('searchTerm') || '');
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [menuSearch, setMenuSearch] = useState(() => {
    const saved = localStorage.getItem('menuSearch');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {};
  });
  const [closelogin, setCloseLogin] = useState(() => {
    const saved = localStorage.getItem('closelogin');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSearch, setIsSearch] = useState(() => {
    const saved = localStorage.getItem('isSearch');
    return saved ? JSON.parse(saved) : false;
  });
  const [userdetails, setUserdetails] = useState(() => {
    const saved = localStorage.getItem('userdetails');
    return saved ? JSON.parse(saved) : '';
  });
  const [isloggedin, setisloggedin] = useState(() => {
    const saved = localStorage.getItem('isloggedin');
    return saved === 'true';
  });
  const [userDetails, setUserDetails] = useState(() => {
    const saved = localStorage.getItem('userDetails');
    return saved ? JSON.parse(saved) : null;
  });
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('hotels');
    return saved ? JSON.parse(saved) : [];
  });
  const [menuType, setMenuType] = useState(() => {
    const saved = localStorage.getItem('menuType');
    return saved ? JSON.parse(saved) : [];
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    const saved = localStorage.getItem('totalPrice');
    return saved ? parseFloat(saved) : 0;
  });
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('dietPlans', JSON.stringify(dietPlans));
  }, [dietPlans]);

  useEffect(() => {
    localStorage.setItem('selectedDietPlan', JSON.stringify(selectedDietPlan));
  }, [selectedDietPlan]);

  useEffect(() => {
    localStorage.setItem('city', city);
  }, [city]);

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('selectedrestaurant', JSON.stringify(selectedrestaurant));
  }, [selectedrestaurant]);

  useEffect(() => {
    localStorage.setItem('selectedmenuItem', JSON.stringify(selectedmenuItem));
  }, [selectedmenuItem]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('menuSearch', JSON.stringify(menuSearch));
  }, [menuSearch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('closelogin', JSON.stringify(closelogin));
  }, [closelogin]);

  useEffect(() => {
    localStorage.setItem('isSearch', JSON.stringify(isSearch));
  }, [isSearch]);

  useEffect(() => {
    localStorage.setItem('userdetails', JSON.stringify(userdetails));
  }, [userdetails]);

  useEffect(() => {
    localStorage.setItem('isloggedin', isloggedin.toString());
  }, [isloggedin]);

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem('menuType', JSON.stringify(menuType));
  }, [menuType]);

  useEffect(() => {
    localStorage.setItem('totalPrice', totalPrice.toString());
  }, [totalPrice]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CityContext.Provider value={{
      dietPlans, setDietPlans,
      selectedDietPlan, setSelectedDietPlan,
      city, setCity,
      restaurants, setRestaurants,
      selectedrestaurant, setSelectedRestaurant,
      selectedmenuItem, setSelectedmenuItem,
      searchTerm, setSearchTerm,
      menuItems, setMenuItems,
      menuSearch, setMenuSearch,
      cart, setCart,
      closelogin, setCloseLogin,
      isSearch, setIsSearch,
      userdetails, setUserdetails,
      isloggedin, setisloggedin,
      userDetails, setUserDetails,
      hotels, setHotels,
      menuType, setMenuType,
      totalPrice, setTotalPrice,
      cartItems, setCartItems
    }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityProvider, CityContext };
