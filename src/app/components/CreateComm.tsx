import React from 'react'
import styles from '@/app/styles/button.module.css'
import Link from 'next/link'

const CreateComm = () => {
  return (
    <div>
        <Link href="/createcommunity">
        <button className={styles.btn}>
            
                <p>Create Community</p>
            
        </button>
        </Link>
    </div>
  )
}

export default CreateComm