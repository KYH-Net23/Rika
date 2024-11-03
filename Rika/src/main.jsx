import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/css/main.css";

import Home from "./views/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>
);
