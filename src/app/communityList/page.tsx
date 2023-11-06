// "use server"
import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'


const CommunityList = async () => {
  // const [comm,setComm] = useState("")
  // axios.get("http://localhost:4000/getComm").then((response) => {
  //   console.log(response.json())
    // setComm(response.data)
    
    const response = await axios.get("http://localhost:4000/getComm",{
      responseType: 'json',
    })
    const datas = response.data
    console.log(datas)

    
  // })

  return (
    <div>
        <HomeNav/>
        <ul>
        {/* <li>
            <Link href="/community">Community 1</Link>
        </li>
        <li>
            Community 2
        </li> */}
        {datas.map(data => <Link href={String(data.comm_id)}><li key={data.comm_id}>{data.comm_name}</li></Link>)}
        </ul>
        
    </div>
  )
}

export default CommunityList