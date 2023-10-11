import React from 'react'
import styles from '@/app/styles/homeNav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import img from '../../../public/LogoName.png'

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
      <Link href="/">My Communities</Link> 
      </li>
      <li>
        <Link href="/">Sign In</Link> 
      </li>
      <li style={{"float":"right","padding":"2px"}}>
      <Link href="/">Club Central</Link> 
      </li>
   </ul>
    </>
  )
}

export default HomeNav