import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: 'root', // tên key để lưu trữ trạng thái của ứng dụng
    storage, // lựa chọn nơi lưu trữ: storage (local storage) hoặc sessionStorage
    // Nếu bạn muốn lưu trạng thái vào sessionStorage thì thay storage bằng sessionStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
