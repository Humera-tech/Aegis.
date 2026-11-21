
import { useState } from "react";
import { motion } from "framer-motion";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "success" | "warning" | "info";
  read: boolean;
};

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Mission Completed",
      message: "Mission Alpha has been successfully completed.",
      time: "2 minutes ago",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "Simulation Running",
      message: "A new system simulation is currently running.",
      time: "15 minutes ago",
      type: "info",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      message: "All AEGIS systems are operating normally.",
      time: "1 hour ago",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "Mission Pending",
      message: "Mission Charlie is waiting for execution.",
      time: "3 hours ago",
      type: "warning",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  const markRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <motion.div
      className="dashboard-page notifications-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-heading">
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Notifications</h1>
          <p>Stay updated with system alerts and mission activity.</p>
        </div>
      </div>

      <div className="notification-stats">
        <div className="dashboard-panel notification-stat">
          <span>Total Notifications</span>
          <h2>{notifications.length}</h2>
        </div>

        <div className="dashboard-panel notification-stat">
          <span>Unread Notifications</span>
          <h2>{unreadCount}</h2>
        </div>
      </div>

      <section className="dashboard-panel notification-panel">
        <div className="notification-heading">
          <div>
            <h2>Recent Alerts</h2>
            <p>Your latest system notifications</p>
          </div>

          <div className="notification-actions">
            <button onClick={markAllRead}>
              Mark All Read
            </button>

            <button onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="notification-empty">
              <span>✓</span>
              <h3>All Clear</h3>
              <p>You have no notifications.</p>
            </div>
          ) : (
            notifications.map((item, index) => (
              <motion.div
                key={item.id}
                className={`notification-item ${
                  item.read ? "read" : "unread"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className={`notification-icon ${item.type}`}>
                  {item.type === "success"
                    ? "✓"
                    : item.type === "warning"
                    ? "!"
                    : "i"}
                </div>

                <div className="notification-content">
                  <div className="notification-title">
                    <strong>{item.title}</strong>
                    {!item.read && <span className="unread-dot" />}
                  </div>

                  <p>{item.message}</p>
                  <span className="notification-time">
                    {item.time}
                  </span>
                </div>

                {!item.read && (
                  <button
                    className="mark-read-button"
                    onClick={() => markRead(item.id)}
                  >
                    Mark Read
                  </button>
                )}
              </motion.div>
            ))
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default Notifications;
