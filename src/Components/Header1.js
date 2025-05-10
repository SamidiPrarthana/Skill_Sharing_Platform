import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/RecipeStyle.css";
import Body from './Body';

function Header1() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token or any stored login data if needed
        localStorage.removeItem("token");
        navigate("/"); // Redirect to home
    };

    return (
        <div>
            <p style={{ width: "50%", marginLeft: "27%", marginRight: "20%", marginTop: "1%", color: "rgba(167, 76, 23, 0.93)", fontWeight: "1000", fontSize: "35px" }}>
                Traditional Recipe Sharing & Learning
            </p>

            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ color: "red" }}>
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <h4 style={{ color: "rgba(243, 224, 24, 0.98)" }}>
                            <b>Recipe <span style={{ color: "white" }}>Management</span></b>
                        </h4>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav" style={{ marginLeft: "10%" }}>
                            <li className="nav-item">
                                <button className="nav-btn" onClick={() => navigate("/home")}>
                                    <div className="nav-link_H"><b>Home</b></div>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/recipes")}>
                                    <div className="nav-link_H"><b>Recipes</b></div>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/postview")}>
                                    <div className="nav-link_H"><b>Post View</b></div>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "10%" }}>
                                <button className="nav-btn" onClick={() => navigate("/PlanList")}>
                                    <div className="nav-link_H"><b>Learning Plans</b></div>
                                </button>
                            </li>
                        </ul>

                        {/* Logout Button */}
                        <div className="d-flex ms-auto" style={{ marginLeft: "auto" }}>
                            <button className="nav-btn logout-btn" onClick={handleLogout}>
                                <div className="nav-link_H"><b>Logout</b></div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header1;
