import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css"; // Use this path or adjust as needed

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home"); // Redirect to home
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />

                    <button type="submit">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <span onClick={() => navigate("/signup")}>Sign up here</span>
                </p>
            </div>
        </div>
    );
}

export default Login;
