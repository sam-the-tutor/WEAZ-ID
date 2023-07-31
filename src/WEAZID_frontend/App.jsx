import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import LoggedOut from "./components/LoggedOut";
import { useAuth, AuthProvider } from "./use-auth-client";
import "./assets/main.css";
import Dashboard from './components/dashboard';
import Admin from "./components/helper/admin";
import SharedLayout from './components/sharedLayout'
import LoadingSpinner from "./components/helper/Loading";

function App() {
  
  return (
    <Routes>
      <Route path ='/' element={< SharedLayout/>}>
        <Route index element={<LoggedOut/>}/>
      <Route path ='dashboard' element={<Dashboard />} />
      </Route>
      <Route path ='admin' element={<Admin />} />
    </Routes>

  );
}

export default () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
);
