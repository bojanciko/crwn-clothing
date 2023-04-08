import React, {useContext} from 'react'
import './cart-item.styles.scss'
import { CartContext } from '../../context/cart.context'


const CartItem = ({cartItem}) => {
  const { name, quantity, imageUrl, price } = cartItem;
 
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
      <h2>{name}</h2>
    </div>
  )
}

export default CartItem