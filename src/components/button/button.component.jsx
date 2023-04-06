import React from 'react'
import './button.styles.scss'

const BUTTON_TYPE_STYLE = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_STYLE[buttonType]}`} {...otherProps}>
      {children}
    </button>
  )
}

export default Button