// @ts-nocheck
'use client'

import React from 'react'
import { useState } from 'react'

const ShowClubs = (props) => {
    // console.log(props.clubs)
    const [newElement,setNewElement] = useState(null)
    var clubs = props.clubs

    const moreInfo = (x) => {
        const newElement = <p>{x.club_description}</p>
        setNewElement(newElement)
        console.log(x)
    }
  return (
    <ul>
        {clubs.map(club => <li key={club.club_id} onClick={()=>moreInfo(club)}>{club.club_name}</li>)}
        {newElement}
    </ul>
  )
}

export default ShowClubs