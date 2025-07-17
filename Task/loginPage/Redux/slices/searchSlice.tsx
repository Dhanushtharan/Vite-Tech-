import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
    destination: string;
    flyFrom: string;
    date: string;
    duration: string;
};

const initialState: SearchState = {
    destination: "",
    flyFrom: "",
    date: "",
    duration: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateField: (state,action: PayloadAction<{ field: keyof SearchState; value: string }>) => {
            state[action.payload.field] = action.payload.value;
            console.log("Redux updateField called: ", action.payload);
        },
    },
});

export const { updateField } = searchSlice.actions;

export default searchSlice.reducer;
