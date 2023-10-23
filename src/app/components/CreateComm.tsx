import React from 'react'
import styles from '@/app/styles/button.module.css'
import Link from 'next/link'

const CreateComm = (props: {option: string}) => {
  return (
    <div>

        <button className={styles.btn}>
            
                <p>Create {props.option}</p>
            
        </button>

    </div>
  )
}

export default CreateComm