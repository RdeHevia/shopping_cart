import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// composeWithDevTools()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// import { createStore} from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducer, composeWithDevTools());

// export default store;
