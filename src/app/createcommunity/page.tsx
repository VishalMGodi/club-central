import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'
import CommunityForm from '../components/CommunityForm'

const NewCommunity = () => {
  return (
    
    <>
    <HomeNav/>
    <h1>New Community</h1>
    <CommunityForm user_id={"1"}/>
    </>
  )
}

export default NewCommunity