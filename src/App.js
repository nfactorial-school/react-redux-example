import React from "react";
import { Router } from "@reach/router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import MainPage from "./posts/MainPage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./App.css";
import "antd/dist/antd.css";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainPage path="/" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </Provider>
  );
}

export default App;
