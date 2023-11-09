import React from 'react'
import HomeNav from './components/HomeNav'
import CreateComm from './components/CreateComm'
import Link from 'next/link'
import axios from 'axios'

const Page = async() => {
  const response = await axios.get("http://localhost:4000/test",{params: {user: 1, comm: 1}})
  console.log(response.data)
  return (
    
    <>
    <HomeNav/>
    <h1>Welcome to Club Central</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aliquid dolores assumenda provident inventore nobis dolorum dignissimos, dicta tempora expedita eos esse iure fugiat cum blanditiis sint sunt. Esse, molestiae.</p>
    </>
    
    
  )
}

export default Page