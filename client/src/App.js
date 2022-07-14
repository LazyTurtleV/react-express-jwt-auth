import React, { useEffect } from "react";
import Router from "./components/router/Router";

import config from './config/config.json';
import AuthService from "./services/AuthService";
import DataService from "./services/DataService";


function App() {
  useEffect(() => {
    DataService.init(config);
    AuthService.init(config);
  },[]);

  return (
    <Router />
  );
}

export default App;
