import React from 'react'
import Link from 'next/link'
import CommNav from '../../../components/CommNav'
import CreateComm from '../../../components/CreateComm'
import axios from 'axios'


const ClubList = async({params}) => {
  console.log(params)
  var id=params.comm_id
  const response = await axios.get(`http://localhost:4000/myClubs/:${id}`);
  const clubs = response.data
  return (
    <div>
        <CommNav comm="TestComm" comm_id='1'/>

        <ul>
            {clubs.map(club => <li key={club.club_id}>{club.club_name}</li>)}
        </ul>

        <Link href="/community/createclub"><CreateComm option={"Club"}/></Link>
    </div>
  )
}

export default ClubList