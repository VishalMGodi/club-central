// @ts-nocheck
'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ClubForm = (props: {comm_id: String}) => {
  const [formValues, setFormValues] = useState({
    comm_id: props.comm_id,
    club_head: "",
    club_name: "",
    club_description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(formValues.name)
    // console.log(formValues.email)
    axios.post("http://localhost:4000/createClub", formValues)
    .then(response => {console.log(response.data)})
    .catch(error => {console.log(error)});

    setFormValues({
      comm_id: props.comm_id,
      club_head: "",
      club_name: "",
      club_description: "",
    });
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Club Name:</label><input type="text" value={formValues.club_name} onChange={(e) =>setFormValues({...formValues,club_name:e.target.value})} placeholder='Club Name'/><br></br>
        <label>Club Head:</label><input type="text" value={formValues.club_head} onChange={(e) =>setFormValues({...formValues,club_head:e.target.value})} placeholder='Club Head Username'/><br></br>
        <label>Club Description:</label><br></br><textarea value={formValues.club_description} onChange={(e) =>setFormValues({...formValues,club_description:e.target.value})} placeholder='Description'/><br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ClubForm