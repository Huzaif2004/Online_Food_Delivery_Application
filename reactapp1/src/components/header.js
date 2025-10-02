import React from 'react';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h1>Order your favourite food here</h1>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients</p>
        <button><a href="#reslist" style={{listStyleType:"none",color:"black"}}>View Menu</a></button>
      </div>
    </div>
  );
};

export default Header;
