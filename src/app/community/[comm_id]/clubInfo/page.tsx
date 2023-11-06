import React from 'react'
import CommNav from '../../../components/CommNav'
import axios from 'axios'


const ClubInfo = async({params}) => {
  console.log("ClubInfo",params.comm_id)
  var id=params.comm_id
  const response = await axios.get(`http://localhost:4000/allClubs/:${id}`);
  const clubs = response.data
  const response2 = await axios.get(`http://localhost:4000/commInfo/:${id}`);
  const comm_name = response2.data[0].comm_name;

  return (
    <div>
        <CommNav comm={comm_name} comm_id={String(id)}/>
        <ul>
            {clubs.map(club => <li key={club.club_id}>{club.club_name}</li>)}
        </ul>
    </div>
  )
}

export default ClubInfo