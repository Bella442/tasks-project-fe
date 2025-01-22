import { motion } from "framer-motion";

import { useTheme } from "@mui/material";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface MenuItemProps {
  text: string;
  onClick: () => void;
}

export const MenuItem = (props: MenuItemProps) => {
  const { palette } = useTheme();

  const style = {
    borderRadius: "8px",
    width: "200px",
    height: "20px",
    padding: "8px",
    border: `2px solid ${palette.primary.main}`,
    backgroundColor: palette.secondary.main,
    marginBottom: "16px",
    color: "white",
    cursor: "pointer",
  };

  return (
    <motion.li
      style={{ listStyle: "none" }}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={props.onClick}
    >
      <div className="text-placeholder" style={style}>
        {props.text}
      </div>
    </motion.li>
  );
};
