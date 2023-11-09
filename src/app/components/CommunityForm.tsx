// @ts-ignore
// @ts-nocheck

'use client'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const CommunityForm = (props: {user_id: String}) => {
  const [formValues, setFormValues] = useState({
    comm_head_id: props.user_id,
    comm_name: "",
    comm_description: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(formValues.name)
    // console.log(formValues.email)
    axios.post("http://localhost:4000/createComm", formValues)
    .then(response => {console.log(response.data)})
    .catch(error => {console.log(error)});

    setFormValues({
      comm_head_id: props.user_id,
      comm_name: "",
      comm_description: "",
    });
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Community Name:</label><input type='text' value={formValues.comm_name} onChange={(e) =>setFormValues({...formValues,comm_name:e.target.value})} placeholder='Community Name'/><br></br>
      <label>Community Description:</label><br></br><textarea value={formValues.comm_description} onChange={(e) =>setFormValues({...formValues,comm_description:e.target.value})} placeholder='Description'/><br></br>
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CommunityForm