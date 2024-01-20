import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import localStorage from "redux-persist/es/storage";

import { usersReducer } from "./features/users/usersSlice";
import postsReducer from "./features/posts/postsSlice";
import interactionsReducer from "./features/interactions/interactionSlice";

// Define the root state type
export interface RootState {
  users: ReturnType<typeof usersReducer>;
  posts: ReturnType<typeof postsReducer>;
  interaction: ReturnType<typeof interactionsReducer>;
}

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  interaction: interactionsReducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
