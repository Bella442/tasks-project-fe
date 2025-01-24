import { Scrollbars } from "react-custom-scrollbars-2";

import { useTheme } from "@mui/material/styles";

interface ScrollbarProps {
  children: React.ReactNode;
}

const Scrollbar = (props: ScrollbarProps) => {
  const theme = useTheme();

  const trackVerticalStyle = {
    position: "absolute",
    top: "2px",
    bottom: "2px",
    right: "2px",
    borderRadius: "4px",
    background: theme.palette.secondary.main + "1C",
    width: "8px",
  };

  const thumbVerticalStyle = {
    cursor: "pointer",
    borderRadius: "inherit",
    background: theme.palette.primary.main + "6B",
  };

  return (
    <Scrollbars
      autoHide
      autoHideDuration={500}
      autoHideTimeout={500}
      renderThumbVertical={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...thumbVerticalStyle }} />
      )}
      renderTrackVertical={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...trackVerticalStyle }} />
      )}
      renderView={({ style, ...props }) => (
        <div {...props} style={{ ...style }} />
      )}
      style={{ height: "100%", width: "100%" }}
    >
      {props.children}
    </Scrollbars>
  );
};

export default Scrollbar;
