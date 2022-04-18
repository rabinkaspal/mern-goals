import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="logo">
                    <Link to="/">GoalSetter</Link>
                </div>
                <ul>
                    <li>
                        <button className="btn">
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
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
                </ul>
            </div>
        </>
    );
};

export default Header;
