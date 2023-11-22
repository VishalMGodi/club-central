// @ts-nocheck
"use client"
import React from "react"
import axios from "axios"
import Link from "next/link"

const LeaveComm = (props) => {
    var form = {user_id: props.user_id, comm_id: props.comm_id}
    var show = props.choice
    if(show === true){

      const handleSubmit = async () => {
        axios.post("http://localhost:4000/removeFromComm", form)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
        
      }
  return (
    <div>
        <Link href={"/community/"}><button onClick={handleSubmit}>Leave Community</button></Link>
    </div>
  )
    }
}

export default LeaveComm