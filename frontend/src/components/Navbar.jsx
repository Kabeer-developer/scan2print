import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/storeSlice";

const Navbar = () => {
  const { store } = useSelector((state) => state.storeAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl font-semibold">
            StoreUploads
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/register" className="hover:underline">
            Register Store
          </Link>
          {store ? (
  <>
    <Link to="/dashboard" className="hover:underline">
      Dashboard
    </Link>
    <button
      onClick={handleLogout}
      className="px-3 py-1 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  </>
) : (
  <Link to="/login" className="hover:underline">
    Login
  </Link>
)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
