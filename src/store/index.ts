import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./module/auth.store";
import { menuReducer } from "./module/menu.store";
import { tagReducer } from "./module/tag.store";
import { themeReducer } from "./module/theme.strore";
import { userReducer } from "./module/user.store";
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    menu: menuReducer,
    tag: tagReducer,
    theme: themeReducer,
    auth: authReducer
  })
);
export const store = configureStore({
  reducer: persistedReducer,
  // 修复持久化时的serializableCheck检查报错行为
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
