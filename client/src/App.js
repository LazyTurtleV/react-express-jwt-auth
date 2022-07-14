import React, { useEffect } from "react";

import config from './config/config.json';
import DataService from "./services/DataService";


function App() {
  useEffect(() => {
    DataService.init(config);
  },[]);

  return (
    <div />
  );
}

export default App;
