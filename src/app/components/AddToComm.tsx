// @ts-nocheck
'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const AddToComm = (props: {comm_id: String}) => {
    const [formValues, setFormValues] = useState({
        comm_id: props.comm_id,
        username: ""
      });

      const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/userComm", formValues)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
    
        setFormValues({
            comm_id: props.comm_id,
            username: ""
        });
        
      }

  return (
    <div>
        <h2>Add To Community</h2>
        <form onSubmit={handleSubmit}>
            <label>Add User: </label><input type="text" value={formValues.username} onChange={(e) =>setFormValues({...formValues,username:e.target.value})} placeholder='Username'/><br/><br/>
            <button type="submit">Send Request</button>
        </form>
    </div>
  )
}

export default AddToComm