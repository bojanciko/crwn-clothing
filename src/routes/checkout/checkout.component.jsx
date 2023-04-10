import React, { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import CartQuantity from '../../components/cart-quantity/cart-quantity.component'
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span> 
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
        ))
      }
      <span className='total'>Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout


{/* <div key={item.id}>
        <img src={item.imageUrl} alt={item.name} />
        <span>{item.name}</span>
        <CartQuantity item={item} />
        <span>{item.price}</span>
        </div> */}