// @ts-nocheck
'use client'

import React from 'react'
import axios from 'axios'

const ClubRequests = (props) => {
    // console.log(props.reqs)
    var reqs = props.reqs
    var res = {req_id: 0, final_decision: "false"}

    const handleSubmit = (req,decision) => {
      res.req_id = req
      res.final_decision = decision
      console.log("Data",req)
      console.log("Decision",decision)
      sendValues()
    }

    const sendValues = async () => {
      axios.post("http://localhost:4000/handleClubReq", res)
      .then(response => {console.log(response.data)})
      .catch(error => {console.log(error)});
      window.location.reload(true)
    }

  return (
    <div>
       <ul>
            {reqs.map(req =>
            <li key={req.club_id}>
              {req.club_name}
              <button onClick={()=>{handleSubmit(req.req_id,"true")}}>Accept</button>
              <button onClick={()=>{handleSubmit(req.req_id,"false")}}>Reject</button>
            </li>)}
       </ul>
    </div>
  )
}

export default ClubRequests