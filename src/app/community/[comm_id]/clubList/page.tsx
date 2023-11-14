// @ts-nocheck
// @ts-ignore

import React from 'react'
import Link from 'next/link'
import CommNav from '../../../components/CommNav'
import CreateComm from '../../../components/CreateComm'
import axios from 'axios'


const ClubList = async({params}) => {
  const user_id = 1
  var show = false
  console.log(params)
  var id=params.comm_id
  const response = await axios.get(`http://localhost:4000/myClubs/`, {params:{user: 1, comm: id}});
  const clubs = response.data
  const response2 = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: id}})
  const comms = response2.data
  if(user_id===comms[0].comm_head_id){
    show=true
  }
  return (
    <div>
        <CommNav comm={comms[0].comm_name} comm_id={`${id}`}/>
        <h1>My Clubs</h1>
        <ul>
            {clubs.map(club => <Link href={`/community/${id}/clubList/${String(club.club_id)}`}><li key={club.club_id}>{club.club_name}</li></Link>)}
        </ul>
           {show && <Link href={`/community/${id}/createclub`}><CreateComm option={"Club"}/></Link> }       
    </div>
  )
}

export default ClubList