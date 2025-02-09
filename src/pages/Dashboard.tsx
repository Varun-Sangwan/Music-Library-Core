import React, { Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const MusicLibrary = React.lazy(() => import("musicLibrary/MusicLibrary"));

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="welcome-text">Welcome, {user.username}!</h1>
        <div className="header-buttons">
          <p className="role-text">
            Role: <span>{user.role}</span>
          </p>
          {user.role === "admin" && (
            <button className="add-song-btn">Add Songs</button>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </header>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <MusicLibrary />
      </Suspense>
    </div>
  );
};

export default Dashboard;
