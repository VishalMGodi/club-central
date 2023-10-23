import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

const SignIn = () => {
  return (
    <div>
        <HomeNav/>
        <SignInForm/>
        <SignUpForm/>
    </div>
  )
}

export default SignIn