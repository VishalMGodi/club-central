"use client";
import React from 'react'
import styles from '@/app/styles/homeNav.module.css'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import img from '../../../public/LogoName.png'


function AuthButton(){
  const { data: session } = useSession();
  if (session){
    console.log("SESSION", session)
    return (
      <>
        {session?.user?.name} <br/>
        <button onClick={()=> signOut()}>Sign Out</button>
      </>
    )
  }else{
    return (
      <>
        {/* Not Signed In <br/> */}
        <button onClick={()=> signIn()}>Sign In</button>
      </>
    )
  }
}

const HomeNav = () => {
  return (
   <>
   <ul className={styles.homeNavbar}>
      <li>
       <Link href="/">Home</Link> 
        </li>
      <li>
      <Link href="/aboutUs">About Us</Link> 
      </li>
      <li>
      <Link href="/community">My Communities</Link> 
      </li>
      <li>
      <Link href="/joinComm">Join Community Requests</Link> 
      </li>
      <li>
        <AuthButton/>
      </li>
      <li style={{"float":"right","padding":"2px"}}>
      <Link href="/">Club Central</Link> 
      </li>
   </ul>
    </>
  )
}

export default HomeNav