
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);
          return 100;
        }
        return previous + 2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="loading-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="loading-logo"
          animate={{
            boxShadow: [
              "0 0 15px rgba(196,205,214,0.1)",
              "0 0 35px rgba(196,205,214,0.35)",
              "0 0 15px rgba(196,205,214,0.1)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          A
        </motion.div>

        <h1>AEGIS</h1>
        <p className="loading-subtitle">ADVANCED CONTROL SYSTEM</p>

        <div className="loading-bar">
          <motion.div
            className="loading-progress"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-info">
          <span>INITIALIZING SYSTEM</span>
          <span>{progress}%</span>
        </div>

        <p className="loading-footer">
          SECURE SYSTEM ENVIRONMENT
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;
