import React, { useContext } from 'react'
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
import { CartContext } from '../../context/cart.context'
import './cart-quantity.styles.scss'


const CartQuantity = ({item}) => {
  const { incrementNumberOfItems, decrementNumberOfItems, removeCartItem } = useContext(CartContext)

  return (
    <div className='quantity-container'>
      <BiChevronLeft className='chevron' onClick={() => removeCartItem(item)} />
      <span className='value'>{item.quantity}</span>
      <BiChevronRight className='chevron' onClick={() => incrementNumberOfItems(item)} />
    </div>
      
  )
}

export default CartQuantity