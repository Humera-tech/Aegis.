
import { motion } from "framer-motion";

const missions = [
  {
    name: "Mission Alpha",
    type: "Surveillance Operation",
    location: "Sector 01",
    status: "Completed",
    progress: 100,
  },
  {
    name: "Mission Bravo",
    type: "Area Monitoring",
    location: "Sector 02",
    status: "In Progress",
    progress: 65,
  },
  {
    name: "Mission Charlie",
    type: "Reconnaissance",
    location: "Sector 03",
    status: "Pending",
    progress: 0,
  },
];

type MissionPageProps = {
  searchQuery?: string;
};

function MissionPage({ searchQuery = "" }: MissionPageProps) {
  const filteredMissions = missions.filter((mission) =>
    `${mission.name} ${mission.type} ${mission.location} ${mission.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
  );

  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="page-heading"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Mission Control</h1>
          <p>Manage and monitor all mission operations.</p>
        </div>

        <span className="system-status">
          ● Operations Center
        </span>
      </motion.div>

      <div className="mission-summary">
        {[
          {
            title: "Total Missions",
            value: "24",
            description: "Recorded operations",
          },
          {
            title: "Active Missions",
            value: "03",
            description: "Currently running",
          },
          {
            title: "Completed",
            value: "18",
            description: "Successfully finished",
          },
        ].map((item, index) => (
          <motion.div
            className="stat-card"
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ y: -5 }}
          >
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span>{item.description}</span>
          </motion.div>
        ))}
      </div>

      <motion.section
        className="dashboard-panel mission-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="panel-heading">
          <div>
            <h3>Mission Operations</h3>
            <p>Current mission progress and operational status.</p>
          </div>
          <span className="activity-live">
            {filteredMissions.length} MISSIONS
          </span>
        </div>

        <div className="mission-cards">
          {filteredMissions.length > 0 ? (
            filteredMissions.map((mission, index) => (
              <motion.div
                className="mission-card"
                key={mission.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="mission-card-top">
                  <div>
                    <p className="eyebrow">{mission.location}</p>
                    <h3>{mission.name}</h3>
                    <p className="mission-description">
                      {mission.type}
                    </p>
                  </div>

                  <span
                    className={`mission-badge ${
                      mission.status.toLowerCase().replace(" ", "-")
                    }`}
                  >
                    {mission.status}
                  </span>
                </div>

                <div className="mission-progress-info">
                  <span>Mission Progress</span>
                  <strong>{mission.progress}%</strong>
                </div>

                <div className="mission-progress-track">
                  <motion.div
                    className="mission-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${mission.progress}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="notification-empty">
              <h3>No missions found</h3>
              <p>Try searching with another mission name or status.</p>
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}

export default MissionPage;
