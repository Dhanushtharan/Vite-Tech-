import Link from 'next/link'
import { NAV_Link, PAGE_HEAD } from '../util/constants'

export default function Home() {
  return (
    <main>
      <h1>{ PAGE_HEAD.page }</h1>
      <nav>
        <ul>
          {NAV_Link.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
