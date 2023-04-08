import React, { createContext, useState, useEffect} from 'react'


const addCartItem = (cartItems, productToadd) => {
  
  const existingItem = cartItems.find((item) => item.id === productToadd.id)
    if (existingItem) {
      return cartItems.map((item) => 
        item.id === productToadd.id ? {...item, quantity: item.quantity + 1}
        : item
      )
    }
    return [...cartItems, {...productToadd, quantity: 1}]
    
    

}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

/**
 * 
 *product {
  id,
  name,
  price,
  imageUrl
 }
 * cartItem {
  id,
  name,
  price,
  imageUrl,
  quantity
 }
 * 
 */


export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total += cartItem.quantity
    }, 0)
    setCartCount(newCartCount)
  }, [cartItems])
  
  const addItemToCart = (productToadd) => {
    setCartItems(addCartItem(cartItems, productToadd))
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
