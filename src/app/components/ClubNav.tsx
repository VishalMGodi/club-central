import React from 'react'
import styles from '@/app/styles/homeNav.module.css'
import Link from 'next/link'

const ClubNav = (props: {club_name: String, club_id: String, comm_id: String, comm_name: String}) => {
  return (
    <ul className={styles.homeNavbar}>
           <li>
            <Link href="/">Home</Link> 
             </li>
           <li>
           <Link href={`/community/${props.comm_id}/clubList/${props.club_id}`}>About the Club</Link> 
           </li>
           <li>
           <Link href="/community/club">Discussions</Link> 
           </li>
           <li>
             <Link href={`/community/${props.comm_id}/clubList/${props.club_id}/newEvent`}>Post Upcoming Event</Link> 
           </li>
           <li>
             <Link href={`/community/${props.comm_id}`}>{props.comm_name} Home</Link> 
           </li>
           <li style={{"float":"right","padding":"2px"}}>
           <Link href={`/community/${props.comm_id}/clubList/${props.club_id}`}>{props.club_name}</Link> 
           </li>
        </ul>
  )
}

export default ClubNav