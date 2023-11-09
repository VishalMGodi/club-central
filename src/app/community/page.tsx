// "use client"
// import React from 'react'
// import CommNav from '../components/CommNav'
// import handler from '../api/getdata'
// import { useState, useEffect } from 'react'
// import axios from 'axios'


// const Community = () => {
//   const [user,setUser] = useState("")
  

// const runIt = async ()=>{ //* CUSTOM INPUTS
//   console.log("Sending: ");
//   try {

//     axios.get("http://localhost:4000/test").then((response) => {
//       console.log(response.data[0].username);
//       setUser(response.data[0].username);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// useEffect(() => {runIt()},[])
//   return (
//     <>
//     <CommNav/>
//     <div>
//       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis minus officiis unde, repudiandae exercitationem voluptates animi non quibusdam eius, dolorum amet. Aut tenetur repudiandae iure soluta nemo ipsam corrupti magni.</p>
//     </div>
//     <br />
//     <div>{user}</div>
//     </>
    
//   )
// }

// export default Community

// import mysql from 'mysql2/promise';

// export default async function handler(req,res){
//     const dbConnection = await mysql.createConnection({
//         host: "localhost",
//         database: "club_central",
//         user: "root",
//         password: "amaatra123",
//         // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
//     })
//     try{
//         const query = "select * from user"
//         const value = []
//         const [data] = await dbConnection.execute(query,value)
//         dbConnection.end()
//         console.log(data)
//         res.status(200).json({results: data})
//     } catch(err){
        
//     }
// }


// "use server"
// @ts-nocheck
// @ts-ignore
import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import CreateComm from '../components/CreateComm'

const CommunityList = async () => {
  // const [comm,setComm] = useState("")
  // axios.get("http://localhost:4000/getComm").then((response) => {
  //   console.log(response.json())
    // setComm(response.data)
    
    const response = await axios.get("http://localhost:4000/getComm/",{params: {userid: 1}})
    const datas = response.data
    console.log(datas)

    
  // })

  return (
    <div>
        <HomeNav/>
        <h1>My Communities</h1>
        <ul>
        {datas.map(data => <Link href={`/community/${String(data.comm_id)}`}><li key={data.comm_id}>{data.comm_name}</li></Link>)}
        </ul>
        <Link href="/createcommunity"><CreateComm option={"Community"}/></Link>
    </div>
  )
}

export default CommunityList