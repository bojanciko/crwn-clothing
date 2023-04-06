import React, { useState } from 'react'
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
const [formFields, setFormFields] = useState(defaultFormFields)

const { displayName, email, password, confirmPassword } = formFields;

const resetFormFields = () => {
  setFormFields(defaultFormFields)
}


const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) return

  try {
    const {user} = await createAuthWithEmailAndPassword(email, password);
    const userDocRef = await createUserDocumentFromAuth(user, {displayName})
    resetFormFields()
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use'){
      alert('Cannot create user! Email already in use!')
    } else {

      console.log(error)
    }
  }


}

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormFields({...formFields, [name]: value})
}


  return (
    <div className='sign-up-container'>
      <h2>Dont have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' required type="text" name='displayName' value={displayName} onChange={handleChange} />

        <FormInput label='Email' required type="email" name='email' value={email} onChange={handleChange} />

        <FormInput label='Password' required type="password" name='password' value={password} onChange={handleChange} />

        <FormInput label='Confirm' required type="password" name='confirmPassword' value={confirmPassword} onChange={handleChange} />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUp