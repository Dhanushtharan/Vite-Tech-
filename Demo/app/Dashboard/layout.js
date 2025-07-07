import Link from 'next/link'
import React from 'react'

const DashboardLayout = ({children}) => {   
  return (
        
    <div>
        <nav style={{ display: 'flex', gap: '1rem', padding: '10px', paddingLeft: '640px' }}>
            <Link href ="/">Home</Link>
            <br></br>
            <Link href ="/Dashboard">Dashboard</Link>
            <br></br>
            <Link href ="/Dashboard/Admin">Admin</Link>
            <br></br>
            <Link href= "/Dashboard/Admin/User">User</Link>
        </nav>
        {children}                      
    </div>
)
    }                                                   

export default DashboardLayout

