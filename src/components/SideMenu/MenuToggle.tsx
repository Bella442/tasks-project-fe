import MenuIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";

import { updateIsMenuOpen } from "./sideMenuSlice";

const MenuToggle = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sideMenu.isOpen);

  return (
    <IconButton
      size="medium"
      sx={{
        backgroundColor: "primary.main",
        color: "background.default",
        ":hover": {
          backgroundColor: "background.default",
          color: "primary.main",
        },
        ":focus": {
          outline: 0,
        },
      }}
      onClick={() => dispatch(updateIsMenuOpen(!isOpen))}
    >
      <MenuIcon fontSize="large" />
    </IconButton>
  );
};

export default MenuToggle;
