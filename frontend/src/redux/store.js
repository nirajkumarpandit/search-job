import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from './companySlice'
import applicantSlice from './applicantSlice'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage use karega

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Sirf auth persist hoga
};

// Root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company:companySlice,
  applicant:applicantSlice
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist ke liye zaroori
    }),
});

export const persistor = persistStore(store);
export default store;
