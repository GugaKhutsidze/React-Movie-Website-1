import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieList from "./pages/MovieList";
import AddMovie from "./pages/Add-Movie";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/MovieList">MovieList</NavLink>
        <NavLink to="/AddMovie">AddMovie</NavLink>
        <NavLink to="/Favorites">Favorites</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/MovieList" element={<MovieList />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;