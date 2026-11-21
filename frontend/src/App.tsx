
import Particles from "./Particles";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DashboardPage from "./pages/DashboardPage";
import MissionPage from "./pages/MissionPage";
import HistoryPage from "./pages/HistoryPage";
import SimulationPage from "./pages/SimulationPage";
import ProfileSettings from "./components/ProfileSettings";
import Notifications from "./components/Notifications";
import LoadingScreen from "./LoadingScreen";

import "./App.css";

type PageId =
  | "dashboard"
  | "missions"
  | "simulation"
  | "history"
  | "settings"
  | "notifications";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "◫" },
  { id: "missions", label: "Missions", icon: "◎" },
  { id: "simulation", label: "Simulation", icon: "⌘" },
  { id: "history", label: "History", icon: "◷" },
  { id: "notifications", label: "Notifications", icon: "♧" },
  { id: "settings", label: "Profile & Settings", icon: "⚙" },
] as const;

const pageComponents = {
  dashboard: DashboardPage,
  missions: MissionPage,
  history: HistoryPage,
  simulation: SimulationPage,
  settings: ProfileSettings,
  notifications: Notifications,
};

function App() {
  const [activePage, setActivePage] =
    useState<PageId>("dashboard");

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const ActivePage = pageComponents[activePage];

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="application"
          className="aegis-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background particle animation */}
          <Particles />

          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">A</div>
              <div>
                <h2>AEGIS</h2>
                <span>CONTROL SYSTEM</span>
              </div>
            </div>

            <div className="sidebar-section">
              <p className="sidebar-label">MAIN MENU</p>

              <nav className="navigation">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`nav-item ${
                      activePage === item.id ? "active" : ""
                    }`}
                    onClick={() => setActivePage(item.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>

                    {activePage === item.id && (
                      <motion.span
                        className="nav-indicator"
                        layoutId="nav-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="sidebar-bottom">
              <div className="sidebar-status">
                <span className="status-dot" />
                <div>
                  <strong>All Systems Operational</strong>
                  <span>AEGIS v1.0</span>
                </div>
              </div>

              <p className="sidebar-footer">
                AEGIS CONTROL CENTER © 2026
              </p>
            </div>
          </aside>

          <main className="main-area">
            <header className="topbar">
              <div>
                <p className="topbar-label">COMMAND CENTER</p>
                <h3>
                  {navigation.find(
                    (item) => item.id === activePage
                  )?.label}
                </h3>
              </div>

              <div className="topbar-right">
                <div className="global-search">
                  <span className="search-icon">⌕</span>
                  <input
                    type="text"
                    placeholder="Search AEGIS..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                  />

                  {searchQuery && (
                    <button
                      className="search-clear"
                      onClick={() => setSearchQuery("")}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="live-indicator">
                  <span className="status-dot" />
                  SYSTEM ONLINE
                </div>

                <motion.div
                  className="user-avatar"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                >
                  A
                </motion.div>
              </div>
            </header>

            <div className="page-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{
                    opacity: 0,
                    y: 18,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    filter: "blur(3px)",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {activePage === "missions" ? (
                    <MissionPage searchQuery={searchQuery} />
                  ) : activePage === "history" ? (
                    <HistoryPage searchQuery={searchQuery} />
                  ) : (
                    <ActivePage />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
