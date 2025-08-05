import React from 'react'
import PaginatedPage from '../components/pagination'

const Pagination = () => {
  return (
    <>
    <center>
    <div
    style={{
        fontSize:'25px',
    }}>
        Pagination using SWR
    </div>
    </center>
    <PaginatedPage />
    </>
    
  )
}

export default Pagination