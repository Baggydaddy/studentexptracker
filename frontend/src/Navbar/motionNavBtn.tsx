import React from "react";
import { motion } from "framer-motion";

type MotionNavButtonProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const MotionNavButton: React.FC<MotionNavButtonProps> = ({
  label,
  active,
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 1.1 }}
    transition={{ duration: 0.3 }}
    className={`nav-motion ${active ? "active" : ""}`}>
    <span>{label}</span>
  </motion.button>
);

export default MotionNavButton;
