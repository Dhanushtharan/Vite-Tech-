
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
<>

    <nav style={{ display: 'flex', gap: '1rem', padding: '10px', paddingLeft: '670px'   }}>
      <Link href ="/Dashboard">Dashboard</Link> <Link href ="/About">About</Link> <Link href ="/Contact">Contact</Link>
    </nav>
    <center>
    <div>Welcome to Home</div>
    <p1> This is the landing page </p1>
    </center>

       <main style={{
    padding: '2rem',
    minHeight: '70vh',
    backgroundImage: 'url("https://res.cloudinary.com/duz2ivzgc/image/upload/v1723210962/255902_iiutmi.jpg")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}> 
      </main>

<footer style={{
  marginTop: '2rem',
  padding: '0rem',
  backgroundColor: 'black',
  textAlign: 'center'
}}>
  <p>&copy; {new Date().getFullYear()}   All rights reserved.</p>
</footer>
</>
  )
}

export default Home