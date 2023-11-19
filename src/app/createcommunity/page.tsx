import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'
import CommunityForm from '../components/CommunityForm'
import { getServerSession } from 'next-auth'

const  NewCommunity = async () => {
  const session = await getServerSession()
  const user_id = session?.user?.email
  return (
    
    <>
    <HomeNav/>
    <h1>New Community</h1>
    <CommunityForm user_id={String(user_id)}/>
    </>
  )
}

export default NewCommunity