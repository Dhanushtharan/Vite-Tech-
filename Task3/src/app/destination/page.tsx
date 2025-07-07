

import SearchBar from "../components/searchBar"
import { PAGE_HEAD } from "@/src/util/constants"

export default function Destination() {
  return (
  <div>
  <center>
  <h2> {PAGE_HEAD.destination} </h2>
  </center>
  <SearchBar/>
  </div>
  )
}
