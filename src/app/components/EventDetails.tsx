// @ts-nocheck
// @ts-ignore
"use client"

import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const EventDetails = (props: {comm_id: String, club_id: String}) => {
  // const [name,setName] = useState("")
  // const [email,setEmail] = useState("")
  const [formValues, setFormValues] = useState({
    club_id: props.club_id,
    event_name: "",
    prize_money: "",
    team_size: "",
    event_type: "",
    event_mode: "",
    event_description: "",
    event_link: "",
    start_time: "",
    end_time: ""
  });
  // const [records,setRecords] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(formValues.name)
    // console.log(formValues.email)
    axios.post("http://localhost:4000/createEvent", formValues)
    .then(response => {console.log(response.data)})
    .catch(error => {console.log(error)});

    setFormValues({
      club_id: props.club_id,
      event_name: "",
      prize_money: "",
      team_size: "",
      event_type: "",
      event_mode: "",
      event_description: "",
      event_link: "",
      start_time: "",
      end_time: ""
    });
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label><input type="text" value={formValues.event_name} onChange={(e) =>setFormValues({...formValues,event_name:e.target.value})} placeholder='Event Name'/><br></br>
        <label>Event Type:</label><input type="text" value={formValues.event_type} onChange={(e) =>setFormValues({...formValues,event_type:e.target.value})} placeholder='Event Type'/><br></br>
        <label>Event Mode:</label><input type="text" value={formValues.event_mode} onChange={(e) =>setFormValues({...formValues,event_mode:e.target.value})} placeholder='Event Mode'/><br></br>
        <label>Event Description:</label><br></br><textarea value={formValues.event_description} onChange={(e) =>setFormValues({...formValues,event_description:e.target.value})} placeholder='Description'/><br></br>
        <label>Event Registration Link:</label><input type="text" value={formValues.event_link} onChange={(e) =>setFormValues({...formValues,event_link:e.target.value})} placeholder='Event Link'/><br></br>
        <label>Team Size:</label><input type="text" value={formValues.team_size} onChange={(e) =>setFormValues({...formValues,team_size:e.target.value})} placeholder='Team Size'/><br></br>
        <label>Prize Money:</label><input type="text" value={formValues.prize_money} onChange={(e) =>setFormValues({...formValues,prize_money:e.target.value})} placeholder='Prize'/><br></br>
        <label>Start Time:</label><input type="text" value={formValues.start_time} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}" onChange={(e) =>setFormValues({...formValues,start_time:e.target.value})} placeholder='Start'/><br></br>
        <label>End Time:</label><input type="text" value={formValues.end_time} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}" onChange={(e) =>setFormValues({...formValues,end_time:e.target.value})} placeholder='End'/><br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EventDetails