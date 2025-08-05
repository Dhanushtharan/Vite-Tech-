'use client'

import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination");
  const flyFrom = searchParams.get("flyFrom");
  const date = searchParams.get("date");
  const duration = searchParams.get("duration");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Booking Details</h1>
      <ul>
        {destination && <li><strong>Destination:</strong> {destination}</li>}
        {flyFrom && <li><strong>Fly From:</strong> {flyFrom}</li>}
        {date && <li><strong>Date:</strong> {date}</li>}
        {duration && <li><strong>Duration:</strong> {duration}</li>}
      </ul>
    </div>
  );
}
