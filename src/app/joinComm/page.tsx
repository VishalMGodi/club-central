import React from 'react'
import HomeNav from '../components/HomeNav'
import axios from 'axios'
import CommRequests from '../components/CommRequests'
import { getServerSession } from 'next-auth'

const joinComm = async () => {
  const session = await getServerSession();
    const user_id = session?.user?.email
    const response = await axios.get("http://localhost:4000/commReq/",{params: {user_id: user_id}})
    var reqs = response.data

  return (
    <div>
        <HomeNav/>
        <h1>Pending Community Requests</h1>
        <CommRequests reqs={reqs} user={user_id}/>
    </div>
  )
}

export default joinComm