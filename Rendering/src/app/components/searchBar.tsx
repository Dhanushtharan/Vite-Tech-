"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";
import { updateField } from "../slices/searchSlice";
import { SEARCH_LABELS } from "@/src/util/constants";
import { useState } from "react";
                  
export default function SearchBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formValues = useSelector((state: RootState) => state.searchInfo);
  const [error, setError] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof typeof formValues, value }));
    if (error) setError("");
  };

  const handleSearch = () => {
    const hasEmptyField = Object.values(formValues).some(
      (value) => !value || value.trim() === ""
    );

    if (hasEmptyField) {
      setError("Please fill in all fields before searching.");
      return;
    }

    setError("");
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
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <label htmlFor="destination">{SEARCH_LABELS.destination}</label>
          <br />
          <input
            type="text"
            name="destination"
            placeholder={SEARCH_LABELS.destinationPlaceholder}
            value={formValues.destination}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="flyFrom">{SEARCH_LABELS.flyFrom}</label>
          <br />
          <input
            type="text"
            name="flyFrom"
            placeholder={SEARCH_LABELS.flyFromPlaceholder}
            value={formValues.flyFrom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="date">{SEARCH_LABELS.date}</label>
          <br />
          <input
            type="date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="duration">{SEARCH_LABELS.duration}</label>
          <br />
          <input
            type="text"
            name="duration"
            placeholder={SEARCH_LABELS.durationPlaceholder}
            value={formValues.duration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleSearch}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          Book Now
        </button>
        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}




// function durationReducer(state: number, action: 'increment' | 'decrement'){
  //   switch (action) {
  //     case 'increment':
  //       return state + 1;
  //     case 'decrement':
  //       return state > 0 ? state - 1 : 0;
  //     default:
  //       return state;
  //   }
  // }