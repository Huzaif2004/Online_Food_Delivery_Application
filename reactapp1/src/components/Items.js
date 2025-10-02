import React from 'react'
import biryani from './images/biryani.avif'
import burger from './images/burger.avif'
import cakes from './images/cakes.avif'
import pizza from './images/pizza.avif'
import chinese from './images/chinese.avif'
import dessert from './images/dessert.avif'
import parotta from './images/parotta.avif'
import shawarma from './images/shawarma.avif'
const ItemsMenu = () => {
    const photos=[biryani,burger,cakes,pizza,chinese,dessert,parotta,shawarma]
        

    
  return (
    <div className='main-container'>

        <h3 style={{marginLeft:"30px"}}>Top Picks For You!!</h3>
    <div className="photo-row">
    {photos.map((photo, index) => (
      <img key={index} src={photo} alt={`Photo ${index + 1}`} />
    ))}
  </div>
  </div>
  )
}

export default ItemsMenu