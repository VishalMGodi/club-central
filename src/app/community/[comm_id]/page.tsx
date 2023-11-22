// @ts-nocheck
// @ts-ignore
import React from 'react'
import CommNav from '@/app/components/CommNav'
import axios from 'axios'
import AddToComm from '@/app/components/AddToComm'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import LeaveComm from '@/app/components/LeaveComm'

const Comm = async ({params}) => {
    const session = await getServerSession()
    const user_id = session?.user?.email
    var show = false
    var id=params.comm_id
    const response = await axios.get(`http://localhost:4000/commInfo/`,{params: {comm_id: id}})
    // console.log(`http://localhost:4000/commInfo/:${id}`)
    const datas=response.data
    console.log(datas)
    console.log(params.comm_id)
    if(user_id==datas[0].comm_head_id) {
      show = true
    }
  return (
    <>
    <CommNav comm={datas[0].comm_name} comm_id={String(datas[0].comm_id)}/>
    <h1>{datas[0].comm_name}</h1>
    <div>{datas[0].comm_description}</div>
    {show && <AddToComm comm_id={params.comm_id}/>}
    <br></br>
    <LeaveComm choice = {!show} comm_id = {id} user_id = {user_id} />
    </>
  )
}

export default Comm