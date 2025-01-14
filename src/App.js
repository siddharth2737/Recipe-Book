import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Auth from "./components/Auth"; 
import "./styles/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Router>
      <div>
        {/* Authentication Component */}
        <Auth setUser={setUser} />
        
        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            background: "#f8f8f8",
          }}
        >
          {/* Left Links */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1>Home</h1>
            </Link>
            {user && (
              <Link to="/favorites" style={{ textDecoration: "none" }}>
                <h2>Favorites</h2>
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={handleSearchChange}
              style={{
                padding: "8px",
                width: "300px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home searchQuery={search} />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
