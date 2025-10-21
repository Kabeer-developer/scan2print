import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">Scan2Print</Link>

        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <button className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>

        <div className={`md:flex md:items-center ${menuOpen ? "block" : "hidden"}`}>
          {user ? (
            <>
              <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
              <button onClick={handleLogout} className="block px-3 py-2 text-red-500 hover:text-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
