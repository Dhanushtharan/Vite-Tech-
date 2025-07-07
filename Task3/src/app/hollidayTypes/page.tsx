import { PAGE_HEAD } from "@/src/util/constants";
import SearchBar from "../components/searchBar";

export default function HollidayTypes() {
  return (
  <div>
  <center>
  <h2> {PAGE_HEAD.hollidayTypes} </h2>
  </center>
  <SearchBar/>
  </div>
  )
}
