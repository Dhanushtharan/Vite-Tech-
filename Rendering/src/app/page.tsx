'use client'

import Link from 'next/link'
import { NAV_Link, PAGE_HEAD } from '../util/constants'
import Clock from './clock/page'

export default function Home() {
  return (
    <main style={{ textAlign: 'center' }}>
      <h1>{PAGE_HEAD.page}</h1>
      <nav>
        <ul style={{
          display: 'flex',
          gap: '2rem',
          padding: 0,
          justifyContent: 'center'
        }}>
          {NAV_Link.map((link) => (
            <li key={link.name}>  
              <br></br><Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Clock />
    </main>
  )
}