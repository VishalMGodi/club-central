// @ts-nocheck
'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const AddToClub = (props: {club_id: String}) => {
    const [formValues, setFormValues] = useState({
        club_id: props.club_id,
        username: ""
      });

      const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/userClub", formValues)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
    
        setFormValues({
            club_id: props.club_id,
            username: ""
        });
        
      }

  return (
    <div>
        <h2>Add To Club</h2>
        <form onSubmit={handleSubmit}>
            <label>Add User: </label><input type="text" value={formValues.username} onChange={(e) =>setFormValues({...formValues,username:e.target.value})} required placeholder='Username'/><br/><br/>
            <button type="submit">Send Request</button>
        </form>
    </div>
  )
}

export default AddToClub