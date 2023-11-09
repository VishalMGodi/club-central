// @ts-nocheck

import React from 'react'
import Link from 'next/link'
import CommNav from '@/app/components/CommNav'
import ClubForm from '@/app/components/ClubForm'
import axios from 'axios'

const NewClub = async({params}) => {
  const id = params.comm_id
  var response = await axios.get("http://localhost:4000/commInfo",{params: {comm_id: id}})
  const comms = response.data
  return (
    
    <>
    <CommNav comm={comms[0].comm_name} comm_id={`${id}`}/>
    <h1>New Club</h1>
    <ClubForm comm_id={id}/>
    </>
  )
}

export default NewClub