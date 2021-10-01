import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
// composeWithDevTools()
const store = createStore(rootReducer, composeWithDevTools());

export default store;

// import { createStore} from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducer, composeWithDevTools());

// export default store;
