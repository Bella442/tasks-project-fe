import { createTheme } from "@mui/material/styles";

import { SIZE } from "./sizeOptions";

declare module "@mui/material/styles" {
  interface Palette {
    [key: string]: Palette["primary"];
  }
}

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#27385b",
    },
    secondary: {
      main: "#3670B6", // Sciant blue
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#8E8C92", // Sciant grey
    },
  },
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: SIZE.XX_LARGE,
      fontWeight: 300,
      lineHeight: 1.167,
    },
    h2: {
      fontSize: SIZE.X_LARGE,
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: SIZE.LARGE,
      fontWeight: 400,
      lineHeight: 1.167,
    },
    h4: {
      fontSize: SIZE.MEDIUM,
      fontWeight: 400,
      lineHeight: 1.235,
    },
    h5: {
      fontSize: SIZE.SMALL,
      fontWeight: 400,
      lineHeight: 1.334,
    },
    body1: {
      fontSize: SIZE.SMALL,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: SIZE.X_SMALL,
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: SIZE.X_SMALL,
      fontWeight: 500,
      lineHeight: 1.75,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});

export const theme = createTheme(baseTheme, {
  // Custom colors created with augmentColor go here
  palette: {
    white: baseTheme.palette.augmentColor({
      color: {
        main: "#FFF",
      },
    }),
    pearlAqua: baseTheme.palette.augmentColor({
      color: {
        main: "#82D4BB",
      },
    }),
    grapePurple: baseTheme.palette.augmentColor({
      color: {
        main: "#5D345C",
      },
    }),
    periwinkleGrey: baseTheme.palette.augmentColor({
      color: {
        main: "#CBC5EA",
      },
    }),
    camoGreen: baseTheme.palette.augmentColor({
      color: {
        main: "#4F5D2F",
      },
    }),
    basketBallOrange: baseTheme.palette.augmentColor({
      color: {
        main: "#F88158",
      },
    }),
  },
});
