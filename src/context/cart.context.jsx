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

const removeItemfromCart = (itemToRemove, cartItems) => {
  if (itemToRemove.quantity === 1) {
    return cartItems.filter((item) => {
      return item.id !== itemToRemove.id
    })
  } 

    return cartItems.map((item) => {
      return item.id === itemToRemove.id ? {...item, quantity: item.quantity - 1 } : item
    })
}

const clearItem = (itemToClear, cartItems) => {
  return cartItems.filter((item) => {
    return item.id !== itemToClear.id
  })
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  clearCartItem: () => {},
  incrementNumberOfItems: () => {},
  decrementNumberOfItems: () => {}
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
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity
    }, 0)
    setCartCount(newCartCount)

    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price
    }, 0)
    setCartTotal(newCartTotal)
  }, [cartItems])
  
  const addItemToCart = (productToadd) => {
    setCartItems(addCartItem(cartItems, productToadd))
  }

  

  const incrementNumberOfItems = (itemToEdit) => {
    const newItems = cartItems.map((item) => 
      item.id === itemToEdit.id ? {...item, quantity: item.quantity + 1}
      : item
    );
    setCartItems(newItems)
  }

  const decrementNumberOfItems = (itemToEdit) => {
    const newItems = cartItems.map((item) => {
      if(itemToEdit.quantity > 0) {
        return item.id === itemToEdit.id ? {...item, quantity: item.quantity - 1}
        : item
      } else {
        removeItemfromCart(itemToEdit)
      }
      });
    
    setCartItems(newItems)
    }

    const removeCartItem = (itemToRemove) => {
      setCartItems(removeItemfromCart(itemToRemove, cartItems))
    }

    const clearCartItem = (itemToClear) => {
      setCartItems(clearItem(itemToClear, cartItems))
    }

    
    

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, incrementNumberOfItems, decrementNumberOfItems, removeCartItem, clearCartItem, cartTotal }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
