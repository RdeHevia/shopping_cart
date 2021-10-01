import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import stockOrder from "./stockOrder";
const rootReducer = combineReducers({ products, cart, stockOrder });

export default rootReducer;
