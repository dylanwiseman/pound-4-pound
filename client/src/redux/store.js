import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise-middleware";

const middleware = [thunk, promiseMiddleware];
const rootReducer = combineReducers({});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
