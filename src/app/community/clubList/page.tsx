import React from 'react'
import Link from 'next/link'
import CommNav from '../../components/CommNav'
import CreateComm from '../../components/CreateComm'

const ClubList = () => {
  return (
    <div>
        <CommNav/>
        <ul>
            <li><Link href="/community/club">My Club 1</Link></li>
            <li>My Club 2</li>
        </ul>
        <Link href="/community/createclub"><CreateComm option={"Club"}/></Link>
    </div>
  )
}

export default ClubList