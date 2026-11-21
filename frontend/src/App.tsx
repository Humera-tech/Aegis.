
import React from "react";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Dashboard</h1>
          <p>Overview of your system and mission activity.</p>
        </div>
        <span className="system-status">● System Online</span>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p>Total Missions</p>
          <h2>24</h2>
          <span>All recorded missions</span>
        </div>

        <div className="stat-card">
          <p>Active Missions</p>
          <h2>03</h2>
          <span>Currently in progress</span>
        </div>

        <div className="stat-card">
          <p>Completed</p>
          <h2>18</h2>
          <span>Successfully completed</span>
        </div>

        <div className="stat-card">
          <p>System Health</p>
          <h2>98%</h2>
          <span>Overall system status</span>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="dashboard-panel">
          <h3>Recent Missions</h3>
          <div className="mission-row">
            <div>
              <strong>Mission Alpha</strong>
              <p>Surveillance operation</p>
            </div>
            <span className="completed">Completed</span>
          </div>

          <div className="mission-row">
            <div>
              <strong>Mission Bravo</strong>
              <p>Area monitoring</p>
            </div>
            <span className="running">In Progress</span>
          </div>

          <div className="mission-row">
            <div>
              <strong>Mission Charlie</strong>
              <p>Reconnaissance operation</p>
            </div>
            <span className="pending">Pending</span>
          </div>
        </section>

        <section className="dashboard-panel">
          <h3>System Overview</h3>
          <div className="system-row">
            <span>Backend Server</span>
            <strong>Online</strong>
          </div>
          <div className="system-row">
            <span>Database</span>
            <strong>Connected</strong>
          </div>
          <div className="system-row">
            <span>Simulation Engine</span>
            <strong>Ready</strong>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;