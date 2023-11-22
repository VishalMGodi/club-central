import React from 'react'
import HomeNav from '@/app/components/HomeNav'
import Link from 'next/link'
import SignInForm from "../../../components/SignInForm"
 //'../components/SignInForm'

const SignIn = () => {
  return (
    <main>
      <center><h1>Club Central</h1><br></br><h2>Sign In</h2></center>
  <SignInForm/>
    </main>
  )
}

export default SignIn