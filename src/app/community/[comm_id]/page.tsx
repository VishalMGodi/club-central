import React from 'react'
import CommNav from '@/app/components/CommNav'
import axios from 'axios'



const Comm = async ({params}) => {
    var id=params.comm_id
    const response = await axios.get(`http://localhost:4000/commInfo/:${id}`)
    // console.log(`http://localhost:4000/commInfo/:${id}`)
    const datas=response.data
    console.log(datas)
    console.log(params.comm_id)
  return (
    <>
    <CommNav comm={datas[0].comm_name} comm_id={String(datas[0].comm_id)}/>
    <div>{datas[0].comm_description}</div>
    </>
  )
}

export default Comm