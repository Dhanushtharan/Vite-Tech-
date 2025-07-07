import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <>
    <center>
    <h1>Contact</h1>
    </center>
    <nav style={{ display: 'flex', gap: '1rem', padding: '10px', paddingLeft: '660px' }}>
      <Link href= '/Dashboard'> Dashboard </Link>
      <Link href= '/About'>About</Link>
      <Link href= '/Contact'>Contact</Link>
    </nav>
     <center>  <p1>This is Contact page</p1></center> 

    </>
  )
}

export default Contact