import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'

const CommunityList = () => {
  return (
    <div>
        <HomeNav/>
        <ul>
        <li>
            <Link href="/community">Community 1</Link>
        </li>
        <li>
            Community 2
        </li>
        </ul>
        
    </div>
  )
}

export default CommunityList