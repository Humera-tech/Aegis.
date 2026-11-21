
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const activities = [
  {
    title: "System Initialization",
    description: "AEGIS control system initialized successfully.",
    time: "Just now",
    type: "success",
  },
  {
    title: "Backend Connection",
    description: "Backend server connection established.",
    time: "2 minutes ago",
    type: "success",
  },
  {
    title: "Mission Bravo",
    description: "Mission status changed to In Progress.",
    time: "5 minutes ago",
    type: "running",
  },
  {
    title: "Simulation Engine",
    description: "Simulation engine is ready for execution.",
    time: "10 minutes ago",
    type: "info",
  },
];

const DashboardPage = () => {
  return (
    <motion.div
      className="dashboard-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="page-heading" variants={itemVariants}>
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Dashboard</h1>
          <p>Overview of your system and mission activity.</p>
        </div>

        <motion.span
          className="system-status"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ● System Online
        </motion.span>
      </motion.div>

      <motion.div
        className="dashboard-stats"
        variants={containerVariants}
      >
        {[
          {
            title: "Total Missions",
            value: "24",
            description: "All recorded missions",
          },
          {
            title: "Active Missions",
            value: "03",
            description: "Currently in progress",
          },
          {
            title: "Completed",
            value: "18",
            description: "Successfully completed",
          },
          {
            title: "System Health",
            value: "98%",
            description: "Overall system status",
          },
        ].map((stat) => (
          <motion.div
            className="stat-card"
            key={stat.title}
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.25 },
            }}
          >
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
            <span>{stat.description}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="dashboard-content"
        variants={containerVariants}
      >
        <motion.section
          className="dashboard-panel"
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Recent Missions</h3>

          {[
            {
              name: "Mission Alpha",
              description: "Surveillance operation",
              status: "Completed",
              className: "completed",
            },
            {
              name: "Mission Bravo",
              description: "Area monitoring",
              status: "In Progress",
              className: "running",
            },
            {
              name: "Mission Charlie",
              description: "Reconnaissance operation",
              status: "Pending",
              className: "pending",
            },
          ].map((mission) => (
            <motion.div
              className="mission-row"
              key={mission.name}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <strong>{mission.name}</strong>
                <p>{mission.description}</p>
              </div>

              <span className={mission.className}>
                {mission.status}
              </span>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          className="dashboard-panel"
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <h3>System Overview</h3>

          {[
            { name: "Backend Server", status: "Online" },
            { name: "Database", status: "Connected" },
            { name: "Simulation Engine", status: "Ready" },
          ].map((system) => (
            <motion.div
              className="system-row"
              key={system.name}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>{system.name}</span>
              <strong>{system.status}</strong>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>

      {/* Recent System Activity */}
      <motion.section
        className="dashboard-panel activity-panel"
        variants={itemVariants}
      >
        <div className="activity-heading">
          <div>
            <h3>Recent System Activity</h3>
            <p>Latest events from the AEGIS control center.</p>
          </div>

          <span className="activity-live">
            <span className="status-dot" />
            ACTIVITY LOG
          </span>
        </div>

        <div className="activity-list">
          {activities.map((activity, index) => (
            <motion.div
              className="activity-item"
              key={activity.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.12 }}
            >
              <span className={`activity-dot ${activity.type}`} />

              <div className="activity-details">
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
              </div>

              <span className="activity-time">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DashboardPage;
