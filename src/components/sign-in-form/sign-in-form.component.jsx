import React, { useState } from 'react'
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'



const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
const [formFields, setFormFields] = useState(defaultFormFields)

const { email, password } = formFields;


const resetFormFields = () => {
  setFormFields(defaultFormFields)
}


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const {user} = await signInAuthWithEmailAndPassword(email, password)
    resetFormFields()
    
  } catch (error) {
    
    switch (error.code) {
      case 'auth/wrong-password':
        alert('Wrong Password')
        break
      case 'auth/user-not-found':
        alert('User does not exist')
        break
      default:
        console.log(error)
    }
      console.log(error)
    
  }


}

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormFields({...formFields, [name]: value})
}

const signInWithGoogle = async () => {
  await signInWithGooglePopup()
}


  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Email' required type="email" name='email' value={email} onChange={handleChange} />

        <FormInput label='Password' required type="password" name='password' value={password} onChange={handleChange} />
        <div className='buttons-container'>
        <Button type='submit'>Sign In</Button>
        <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm