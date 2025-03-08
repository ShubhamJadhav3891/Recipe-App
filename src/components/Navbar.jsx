import React from "react";
import { Link, useNavigate } from "react-router-dom";
import chatbotImg from "../assets/images/chatbot.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn, user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        navigate("/signin");
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="brand">Tasty<span className="highlight">Bites</span></span>
            </div>
            <div className="nav-right">
                <ul className="nav-links">
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/feed">Feed</Link></li>
                    {!isLoggedIn && <li><Link to="/account">Create Account</Link></li>}
                </ul>
                <div className="nav-actions">
                    {isLoggedIn ? (
                        <>
                            <FaUserCircle size={30} title={user} style={{ marginRight: "10px" }} />
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <button className="logout-btn">
                            <Link to="/signin">Sign In</Link>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;