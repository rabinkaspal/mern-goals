import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        toast.success("User logged out successfully");
    };

    return (
        <>
            <div className="header">
                <div className="logo">
                    <Link to="/">GoalSetter</Link>
                </div>
                <ul>
                    {user && (
                        <li>
                            <button className="btn" onClick={() => onLogout()}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    )}
                    {!user && (
                        <>
                            <li>
                                <Link to="/login">
                                    <FaSignInAlt /> Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <FaUserAlt /> Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Header;
