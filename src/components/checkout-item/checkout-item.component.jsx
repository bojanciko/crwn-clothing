import React, { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../context/cart.context'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem

  const { clearCartItem, removeCartItem, incrementNumberOfItems } = useContext(CartContext)

  const clearItem = () =>  clearCartItem(cartItem)
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>

      <BiChevronLeft className='arrow' onClick={() => removeCartItem(cartItem)} />
      <span className='value'>{cartItem.quantity}</span>
      <BiChevronRight className='arrow' onClick={() => incrementNumberOfItems(cartItem)} />
      </span>
      {/* <span className='quantity'>{quantity}</span> */}
      <span className='price'>{price}</span>
      <div onClick={clearItem} className='remove-button'>&#10005;</div>
    </div>
  )
}

export default CheckoutItem