
import { useState } from "react";
import { motion } from "framer-motion";

function ProfileSettings() {
  const [name, setName] = useState("AEGIS Administrator");
  const [email, setEmail] = useState("admin@aegis.system");
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <motion.div
      className="dashboard-page profile-settings-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-heading">
        <div>
          <p className="eyebrow">AEGIS CONTROL CENTER</p>
          <h1>Profile & Settings</h1>
          <p>Manage your account and system preferences.</p>
        </div>
      </div>

      <div className="profile-layout">
        <section className="dashboard-panel profile-card">
          <div className="panel-heading">
            <div>
              <h2>Administrator Profile</h2>
              <p>Your account information</p>
            </div>
          </div>

          <div className="profile-avatar">A</div>

          <div className="profile-form">
            <label>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <button
              className="primary-button"
              onClick={() => alert("Profile settings saved!")}
            >
              Save Profile
            </button>
          </div>
        </section>

        <section className="dashboard-panel settings-card">
          <div className="panel-heading">
            <div>
              <h2>System Preferences</h2>
              <p>Customize your AEGIS experience</p>
            </div>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div>
                <strong>Notifications</strong>
                <p>Receive system alerts and updates</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </div>

            <div className="setting-item">
              <div>
                <strong>Sound Effects</strong>
                <p>Enable system notification sounds</p>
              </div>
              <input
                type="checkbox"
                checked={sound}
                onChange={(e) => setSound(e.target.checked)}
              />
            </div>

            <div className="setting-item">
              <div>
                <strong>Auto Save</strong>
                <p>Automatically save system changes</p>
              </div>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default ProfileSettings;
