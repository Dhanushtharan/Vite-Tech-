import React from 'react'
import Link from 'next/link'

const About  = () => {
  return (
    <>
    <center>
          <div>About</div>
       
    </center>
    <nav style={{ display: 'flex', gap: '1rem', padding: '10px', paddingLeft: '640px' }}>
      <Link href ="/Dashboard">Dashboard</Link> <br></br> <Link href ="/About">About</Link> <br></br> <Link href ="/Contact">Contact</Link>
      </nav>      
        <center> <p1>This is the About page</p1> </center>

    </>
  )
}

export default About 