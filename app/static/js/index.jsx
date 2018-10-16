/*jshint esversion: 6 */
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from './store';
import socket from './socket'


ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>
    , document.getElementById("content"));


