
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SimulationPage() {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Standard");
  const [progress, setProgress] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);
          setSimulationRunning(false);
          setCompleted(true);
          setTotalRuns((total) => total + 1);
          return 100;
        }

        return Math.min(previous + 5, 100);
      });
    }, 300);

    return () => clearInterval(interval);
  }, [simulationRunning]);

  const startSimulation = () => {
    if (simulationRunning) return;

    setProgress(0);
    setCompleted(false);
    setSimulationRunning(true);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    setProgress(0);
    setCompleted(false);
  };

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Heading */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Simulation Center</h1>
          <p>Configure, execute and monitor system simulations.</p>
        </div>

        <span className="status-badge">
          {simulationRunning
            ? "RUNNING"
            : completed
            ? "COMPLETED"
            : "STANDBY"}
        </span>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        {[
          {
            label: "TOTAL SIMULATIONS",
            value: String(totalRuns).padStart(2, "0"),
            description: "Recorded simulation runs",
          },
          {
            label: "ACTIVE SIMULATIONS",
            value: simulationRunning ? "01" : "00",
            description: "Currently executing",
          },
          {
            label: "SYSTEM STATUS",
            value: simulationRunning ? "Active" : "Ready",
            description: "Simulation environment",
          },
        ].map((stat, index) => (
          <motion.div
            className="stat-card"
            key={stat.label}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="stat-label">{stat.label}</span>
            <h2>{stat.value}</h2>
            <p>{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Configuration */}
      <motion.section
        className="dashboard-panel simulation-config"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="panel-heading">
          <div>
            <h3>Simulation Configuration</h3>
            <p>Configure your simulation environment before execution.</p>
          </div>
        </div>

        <div className="simulation-form">
          <label htmlFor="simulation-mode">Simulation Mode</label>

          <select
            id="simulation-mode"
            value={selectedMode}
            onChange={(event) => setSelectedMode(event.target.value)}
            disabled={simulationRunning}
          >
            <option value="Standard">Standard Simulation</option>
            <option value="Advanced">Advanced Simulation</option>
            <option value="Test">Test Simulation</option>
          </select>

          <div className="simulation-actions">
            <button
              className="primary-button"
              onClick={startSimulation}
              disabled={simulationRunning}
            >
              {simulationRunning ? "Executing..." : "Start Simulation"}
            </button>

            <button
              className="simulation-reset-button"
              onClick={resetSimulation}
              disabled={simulationRunning}
            >
              Reset
            </button>
          </div>
        </div>
      </motion.section>

      {/* Execution Monitor */}
      <motion.section
        className="dashboard-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="panel-heading">
          <div>
            <h3>Execution Monitor</h3>
            <p>Monitor simulation execution in real time.</p>
          </div>

          <span className="status-badge">
            {simulationRunning
              ? "IN PROGRESS"
              : completed
              ? "SUCCESS"
              : "IDLE"}
          </span>
        </div>

        <div className="simulation-monitor">
          <div className="monitor-info">
            <span>{selectedMode} Simulation</span>
            <strong>{progress}%</strong>
          </div>

          <div className="progress-track">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <p>
            {completed
              ? "Simulation completed successfully."
              : simulationRunning
              ? "Simulation is currently executing..."
              : "Waiting for simulation to start."}
          </p>
        </div>
      </motion.section>

      {/* Simulation Results */}
      <motion.section
        className="dashboard-panel simulation-results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="panel-heading">
          <div>
            <h3>Simulation Results</h3>
            <p>Latest execution summary.</p>
          </div>
        </div>

        <div className="result-grid">
          <div className="result-item">
            <span>Selected Mode</span>
            <strong>{selectedMode}</strong>
          </div>

          <div className="result-item">
            <span>Execution Progress</span>
            <strong>{progress}%</strong>
          </div>

          <div className="result-item">
            <span>Execution Status</span>
            <strong>
              {completed
                ? "Successful"
                : simulationRunning
                ? "Running"
                : "Not Started"}
            </strong>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default SimulationPage;
