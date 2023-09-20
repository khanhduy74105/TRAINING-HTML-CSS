// import { createStore } from "redux";
// import rootReducer from "./rootReducer";
// import { composeWithDevTools } from "redux-devtools-extension";
// const enhancver = composeWithDevTools()
// const store = createStore(rootReducer, enhancver)

// export default store

import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slices/authSlice";
import cartProductsSlice from "./slices/cartProductsSlice";

const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        cartProducts: cartProductsSlice.reducer,
    }
})

export default store

