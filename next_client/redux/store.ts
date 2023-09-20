import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const enhancver = composeWithDevTools()
const store = createStore(rootReducer, enhancver)

export default store