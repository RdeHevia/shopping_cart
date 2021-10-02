import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Header from "./components/Header.js";
import Products from "./components/Products.js";
import AddForm from "./components/AddForm.js";
import { checkout } from "./actions/cartActions.js";
/*

THUNK REFACTORING (EXTRA):
1. Extract API logic
2. Move all the code inside useEffect to action creators, one by one
*/

const App = () => {
  console.log(process.env.SERVER_HOST);
  return (
    <div id="app">
      <Header />
      <main>
        <Products />
        <AddForm />
      </main>
    </div>
  );
};

export default App;
