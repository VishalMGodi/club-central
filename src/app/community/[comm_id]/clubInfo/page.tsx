// @ts-nocheck
// @ts-ignore
// 'use client'
import React from 'react'
import CommNav from '../../../components/CommNav'
import axios from 'axios'
import ShowClubs from '@/app/components/ShowClubs'

const ClubInfo = async({params}) => {
  console.log("ClubInfo",params.comm_id)
  var id=params.comm_id
  const response = await axios.get(`http://localhost:4000/allClubs/`, {params: {comm_id: id}});
  const clubs = response.data
  const response2 = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: id}});
  const comm_name = response2.data[0].comm_name;


  return (
    <div>
        <CommNav comm={comm_name} comm_id={String(id)}/>
        <h1>All Clubs</h1>
        <ShowClubs clubs={clubs}/>
    </div>
  )
}

export default ClubInfo