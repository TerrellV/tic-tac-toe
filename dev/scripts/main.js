import React from "react";
import ReactDOM from "react-dom";

import assign from "object-assign";
import {EventEmitter} from "events";

import {App} from "./components/app.js";

ReactDOM.render(
  <App/>,
  document.getElementById('main')
)
