import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// whenever store change => change AsyncStorage with the key likedJobs (name of the likes_reducer in combineReducers)

// persistStore(store, { storage: AsyncStorage, whitelist: ["likedJobs"] }).purge(); => throw away all saved data

const persistConfig = { key: "likedJobs", storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    applyMiddleware(thunk)
    //autoRehydrate: store enhancer => pull data from AsyncStorage and push to reducers
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
