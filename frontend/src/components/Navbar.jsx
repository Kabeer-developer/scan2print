import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Scan2Print</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={() => dispatch(logout())} className="text-red-500">Logout</button>
          </>
        ) : (
          <Link to="/register" className="hover:underline">Register Store</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
