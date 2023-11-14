// @ts-nocheck

import React from 'react'
import CommNav from '@/app/components/CommNav'
import axios from 'axios'

const Announcements = async({params}) => {
    var response = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: params.comm_id}})
    const datas = response.data
    response = await axios.get(`http://localhost:4000/allEvents/`, {params: {comm_id: params.comm_id}})
    const events = response.data
    
  return (
    <>
    <CommNav comm={datas[0].comm_name} comm_id={String(datas[0].comm_id)}/>
    <h1>Announcements</h1>
    <ul>
        {events.map(event => <li key={event.event_id}>{event.event_name}</li>)}
    </ul>
    </>
  )
}

export default Announcements