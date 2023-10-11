import React from 'react'
import HomeNav from '../components/HomeNav'
import Link from 'next/link'

const NewCommunity = () => {
  return (

    <>
    <HomeNav/>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt dolore veritatis obcaecati repellendus, facere sint fugiat labore? Rerum harum minima soluta laudantium impedit! Facere incidunt ab, inventore voluptatem illo harum.</p>
    <Link href="/community"><div>NewCommunity</div></Link>
    </>
  )
}

export default NewCommunity