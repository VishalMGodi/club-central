import React from 'react'
import Link from 'next/link'
import SignUpForm from '../../../components/SignUpForm'

const SignUp = () => {
  return (
    <main>
      <center><h1>Club Central</h1><br></br><h2>Sign Up</h2></center>
      <SignUpForm/>
      <br></br>
     <center> <Link href="/api/auth/signin"><button><h3>Sign in instead</h3></button></Link></center>
    </main>
  
  )
}

export default SignUp