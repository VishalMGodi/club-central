// @ts-nocheck
// @ts-ignore
import React from 'react'
import axios from 'axios'
import ClubNav from '@/app/components/ClubNav'
import EventDetails from '@/app/components/EventDetails'


const NewEvent = async ({params}) => {
    console.log(params.comm_id)
    const comm = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: params.comm_id}})
    const club = await axios.get(`http://localhost:4000/clubInfo/`,{params: {club_id: params.club_id}})
    const comms = comm.data
    const clubs = club.data
  return (
    <>
    <ClubNav club_name={clubs[0].club_name} comm_name={comms[0].comm_name} club_id={clubs[0].club_id} comm_id={comms[0].comm_id}/>
    <h1>New Event for {clubs[0].club_name}</h1>
    <EventDetails comm_id={(params.comm_id)} club_id={(params.club_id)}/>
    </>
  
  )
}

export default NewEvent