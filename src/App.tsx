import React, { useState } from "react";
// import { Route } from 'react-router-dom';
import TodoSample from "./components/TodoSample";
import Banner from "./components/Banner";
import MainBoard from "./components/MainBoard";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="layout">
        <Banner />
        <MainBoard />
      </div>
    </div>
  );
};

export default App;
