import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      defaultRating={3}
      message={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
    />
    <StarRating maxRating={10} color="red" size={80} className="test" /> */}
  </React.StrictMode>
);
