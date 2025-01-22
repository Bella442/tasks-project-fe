import { ReactNode } from "react";

import { AppBar, Box, Toolbar } from "@mui/material";

import { HEADER_HEIGHT } from "@constants/constants";

interface HeaderProps {
  children?: ReactNode;
}

const Header = (props: HeaderProps) => {
  return (
    <Box sx={{ height: HEADER_HEIGHT }}>
      <AppBar position="static">
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
