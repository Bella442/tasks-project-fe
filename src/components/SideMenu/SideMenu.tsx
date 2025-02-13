import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Backdrop, Grid } from "@mui/material";

import { HEADER_HEIGHT, SIDE_BAR_LINKS } from "@constants/constants";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";

import { MenuItem } from "./MenuItem";
import { updateIsMenuOpen } from "./sideMenuSlice";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 0px 0px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const SideMenu = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sideMenu.isOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const closeMenu = () => {
    dispatch(updateIsMenuOpen(false));
  };

  useEffect(() => {
    if (isOpen) {
      setOpenBackdrop(true);
    } else {
      setTimeout(() => {
        setOpenBackdrop(false);
      }, 1000);
    }
  }, [isOpen]);

  return (
    <Backdrop
      aria-hidden
      open={openBackdrop}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        justifyContent: "flex-start",
        top: HEADER_HEIGHT,
      }}
      onClick={closeMenu}
    >
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        style={{
          position: "absolute",
          zIndex: 2,
          backgroundColor: "ghostwhite",
          height: "100%",
        }}
        variants={sidebar}
      >
        <Grid
          container
          flexDirection="column"
          padding={2}
          role="presentation"
          spacing={2}
          textAlign="center"
        >
          <Grid item>
            <img
              height="150px"
              src={"/src/assets/images/templateLogo.png"}
              width="150px"
            />
          </Grid>
          <Grid item>
            <motion.ul
              style={{ margin: 0, padding: 0 }}
              variants={listVariants}
            >
              {SIDE_BAR_LINKS.map(
                (link: { text: string; to: string }, index: number) => (
                  <MenuItem
                    key={index}
                    text={t(link.text)}
                    onClick={() => {
                      closeMenu();
                      if (location.pathname !== link.to) {
                        navigate(link.to);
                      }
                    }}
                  />
                ),
              )}
            </motion.ul>
          </Grid>
        </Grid>
      </motion.nav>
    </Backdrop>
  );
};

export default SideMenu;
