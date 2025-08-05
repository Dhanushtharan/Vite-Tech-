import { Suspense } from "react";
import SearchResults from "../components/searchResults";

export default function SearchResultsPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading booking info...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
