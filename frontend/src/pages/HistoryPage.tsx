import { motion } from "framer-motion";

const history = [
  {
    id: "AEG-001",
    name: "System Initialization",
    type: "System Operation",
    date: "21 Nov 2026",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    id: "AEG-002",
    name: "Environment Scan",
    type: "Monitoring",
    date: "20 Nov 2026",
    time: "02:15 PM",
    status: "Completed",
  },
  {
    id: "AEG-003",
    name: "Simulation Test",
    type: "Simulation",
    date: "19 Nov 2026",
    time: "11:45 AM",
    status: "Pending",
  },
];

type HistoryPageProps = {
  searchQuery?: string;
};

function HistoryPage({ searchQuery = "" }: HistoryPageProps) {
  const filteredHistory = history.filter((item) =>
    `${item.id} ${item.name} ${item.type} ${item.date} ${item.time} ${item.status}`
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  return (
    <motion.div className="dashboard-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-heading">
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Activity History</h1>
          <p>Review previous system activities and operations.</p>
        </div>
        <span className="status-badge">SYSTEM LOGS</span>
      </div>

      <div className="stats-grid">
        {[
          { label: "TOTAL ACTIVITIES", value: "03", description: "Recorded activities" },
          { label: "COMPLETED", value: "02", description: "Successfully finished" },
          { label: "PENDING", value: "01", description: "Awaiting execution" },
        ].map((stat, index) => (
          <motion.div className="stat-card" key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }}>
            <span className="stat-label">{stat.label}</span>
            <h2>{stat.value}</h2>
            <p>{stat.description}</p>
          </motion.div>
        ))}
      </div>

      <section className="dashboard-panel history-panel">
        <div className="panel-heading">
          <div>
            <h3>System Activity Timeline</h3>
            <p>Chronological record of system operations.</p>
          </div>
          <span className="activity-live">{filteredHistory.length} RECORDS</span>
        </div>

        <div className="history-timeline">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item, index) => (
              <motion.div className="timeline-item" key={item.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.15 }}>
                <div className="timeline-marker">
                  <span className={`timeline-dot ${item.status.toLowerCase()}`} />
                </div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div>
                      <span className="timeline-id">{item.id}</span>
                      <h3>{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                    <span className={`mission-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>
                  <div className="timeline-date">
                    <span>{item.date}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="notification-empty">
              <h3>No records found</h3>
              <p>Try searching with another activity name or status.</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default HistoryPage;