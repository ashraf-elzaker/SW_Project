
import React from "react";
import ReactDOM from "react-dom/client";
import WTVMarket from "./WTV_market.jsx"; 
import { AuthProvider } from './AuthProvider';


import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <WTVMarket />
    </AuthProvider>
  </React.StrictMode>
);
