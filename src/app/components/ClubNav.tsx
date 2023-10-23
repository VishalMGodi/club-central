import React from 'react'
import styles from '@/app/styles/homeNav.module.css'
import Link from 'next/link'

const ClubNav = () => {
  return (
    <ul className={styles.homeNavbar}>
           <li>
            <Link href="/">Home</Link> 
             </li>
           <li>
           <Link href="/community/club">About the Club</Link> 
           </li>
           <li>
           <Link href="/community/club">Discussions</Link> 
           </li>
           <li>
           <Link href="/community/club">Add Details</Link> 
           </li>
           <li>
             <Link href="/community/club">Post Upcoming Event</Link> 
           </li>
           <li>
             <Link href="/community">Respective Community Home</Link> 
           </li>
           <li style={{"float":"right","padding":"2px"}}>
           <Link href="/community/club">Club Name</Link> 
           </li>
        </ul>
  )
}

export default ClubNav