import React from 'react'
import Link from 'next/link'
import styles from '@/app/styles/homeNav.module.css'

const CommNav = (props: {comm: String, comm_id: string}) => {
    return (
        <>
        <ul className={styles.homeNavbar}>
           <li>
            <Link href="/">Home</Link> 
             </li>
           {/* <li>
           <Link href="/community">About the Community</Link> 
           </li> */}
           <li>
           <Link href={`/community/${props.comm_id}/clubInfo`}>View Clubs</Link> 
           </li>
           <li>
           <Link href={`/community/${props.comm_id}/clubList`}>My Clubs</Link> 
           </li>
           <li>
             <Link href="/">Announcements</Link> 
           </li>
           <li style={{"float":"right","padding":"2px"}}>
           <Link href={`/community/${props.comm_id}`}>{props.comm}</Link> 
           </li>
        </ul>
         </>
       )
}

export default CommNav