import React from 'react'
import HomeNav from './components/HomeNav'
import CreateComm from './components/CreateComm'
import Link from 'next/link'
const Page = () => {
  return (
    
    <>
    <HomeNav/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aliquid dolores assumenda provident inventore nobis dolorum dignissimos, dicta tempora expedita eos esse iure fugiat cum blanditiis sint sunt. Esse, molestiae.</p>
    <Link href="/createcommunity"><CreateComm option={"Community"}/></Link>
    </>
    
    
  )
}

export default Page