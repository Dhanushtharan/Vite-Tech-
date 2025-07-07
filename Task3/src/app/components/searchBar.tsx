"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SEARCH_LABELS } from "@/src/util/constants";

export default function SearchBar() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    destination: "",
    flyFrom: "",
    date: "",
    duration: "",
  });
  const name ="swetha"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };  
    
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    Object.entries(formValues).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div
      style={{
        paddingLeft: "340px",
        paddingTop: "50px",
        display: "flex",
        gap: "1rem",
        marginTop: "1rem",
        alignItems: "center",
      }}
    >
      <div>
        <label htmlFor="destination">{SEARCH_LABELS.destination}</label><br />
        <input
          type="text"
          id="destination"
          name="destination"
          placeholder={SEARCH_LABELS.destinationPlaceholder}
          value={formValues.destination}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="flyFrom">{SEARCH_LABELS.flyFrom}</label><br />
        <input
          type="text"
          id="flyFrom"
          name="flyFrom"
          placeholder={SEARCH_LABELS.flyFromPlaceholder}
          value={formValues.flyFrom}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="date">{SEARCH_LABELS.date}</label><br />
        <input
          type="date"
          id="date"
          name="date"
          placeholder={SEARCH_LABELS.datePlaceholder}
          value={formValues.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="duration">{SEARCH_LABELS.duration}</label><br />
        <input
          type="text"
          id="duration"
          name="duration"
          placeholder={SEARCH_LABELS.durationPlaceholder}
          value={formValues.duration}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
