import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "../redux/features/authSlice";

// Persist configuration
const persistConfig = {
  key: "autozone",
  storage,
};

// Combine all reducers
const appReducer = combineReducers({
  auth: authSlice,
});

// Root reducer to handle clearing state on logout
const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // Clear all persisted state
    storage.removeItem("persist:task");
    state = undefined;
  }
  return appReducer(state, action);
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
