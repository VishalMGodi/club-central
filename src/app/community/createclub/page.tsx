import React from 'react'
import Link from 'next/link'
import CommNav from '@/app/components/CommNav'
import ClubForm from '@/app/components/ClubForm'

const NewClub = () => {
  return (
    
    <>
    <CommNav/>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt dolore veritatis obcaecati repellendus, facere sint fugiat labore? Rerum harum minima soluta laudantium impedit! Facere incidunt ab, inventore voluptatem illo harum.</p>
    <Link href="/community/club"><div>NewClub</div></Link>
    <ClubForm/>
    </>
  )
}

export default NewClub