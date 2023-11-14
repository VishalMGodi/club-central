// @ts-nocheck

import React from 'react'
import axios from 'axios'
import ClubNav from '@/app/components/ClubNav'
import AddToClub from '@/app/components/AddToClub'

const Club = async({params}) => {
    const user_id = 1
    var show = false
    console.log(params.comm_id)
    const comm = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: params.comm_id}})
    const club = await axios.get(`http://localhost:4000/clubInfo/`,{params: {club_id: params.club_id}})
    const comms = comm.data
    const clubs = club.data

    if(clubs[0].club_head_id===user_id) { show=true}

    if(clubs[0].comm_id==comms[0].comm_id){
      return (
        <div>
        <ClubNav club_name={clubs[0].club_name} comm_name={comms[0].comm_name} club_id={clubs[0].club_id} comm_id={comms[0].comm_id}/>
        <h1>{clubs[0].club_name}</h1>
        <div>{clubs[0].club_description}</div>
        {show && <AddToClub club_id={params.club_id}/>}
        </div>
        
      )
    }
  
}

export default Club