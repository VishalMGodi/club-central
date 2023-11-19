// @ts-nocheck
// @ts-ignore

import React from 'react'
import CommNav from '../../../components/CommNav'
import axios from 'axios'
import ClubRequests from '@/app/components/ClubRequests'
import { getServerSession } from 'next-auth'


const ClubReq = async({params}) => {
  const session = await getServerSession()
  const user_id = session?.user?.email
  console.log(params)
  var comm_id=params.comm_id
  const response = await axios.get("http://localhost:4000/clubReq/",{params: {comm_id: comm_id, user_id: user_id}})
  const reqs = response.data
  const response2 = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: comm_id}})
  const comms = response2.data

  return (
    <div>
        <CommNav comm={comms[0].comm_name} comm_id={`${comm_id}`}/>
        <h1>Pending Club Requests</h1>
        <ClubRequests reqs={reqs}/>
    </div>
  )
}

export default ClubReq