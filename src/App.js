import { useEffect } from 'react';

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import {useInitFbSDK} from './components/helper'
import Converation from './Pages/Conversation/Converation';
function App() {
  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/chatlane" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/messages" element={<Converation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
