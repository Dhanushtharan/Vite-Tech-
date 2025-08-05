'use client'

import { configureStore } from "@reduxjs/toolkit";
import  searchReducer  from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        searchInfo: searchReducer,                                                                 
    },
    // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


// 'use client'

// import { configureStore } from "@reduxjs/toolkit";
// import  searchReducer  from "./slices/searchSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
// };
                                                                                                
// const persistedSearchReducer = persistReducer(persistConfig, searchReducer);                //persist redux              

// const store = configureStore({
//     reducer: {
//         searchInfo: persistedSearchReducer, 
//     },
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
