// @ts-nocheck
"use client"
import Link from 'next/link'
import React from 'react'
import axios from 'axios'

const LeaveClub = (props) => {
    
    var form = {user_id: props.user_id, club_id: props.club_id}
    var show = props.choice
    if(show === true){

      const handleSubmit = async () => {
        axios.post("http://localhost:4000/removeFromClub", form)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
        
      }
  return (
    <div>
        <Link href={`/community/${props.comm_id}/clubList`}><button onClick={handleSubmit}>Leave Club</button></Link>
    </div>
  )
    }
}

export default LeaveClub