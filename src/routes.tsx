import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import PlantDetails from "./screens/PlantDetails";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="details/:idPlant"  element={<PlantDetails />} />
    </Routes>
  );
}
