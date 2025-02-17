import { forwardRef, RefObject } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

import { useTheme } from "@mui/material/styles";

interface ScrollbarProps {
  children: React.ReactNode;
  ref?: RefObject<Scrollbars>;
}

const Scrollbar = forwardRef(function Scrollbar(props: ScrollbarProps, ref) {
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

  const trackHorizontalStyle = {
    position: "absolute",
    height: "6px",
    right: "2px",
    bottom: "2px",
    left: "2px",
    borderRadius: "3px",
  };

  const thumbHorizontalStyle = {
    position: "relative",
    display: "block",
    height: "100%",
    cursor: "pointer",
    borderRadius: "inherit",
    backgroundColor: theme.palette.primary.main + "6B",
  };

  return (
    <Scrollbars
      ref={ref as RefObject<Scrollbars>}
      autoHide
      hideTracksWhenNotNeeded
      autoHideDuration={500}
      autoHideTimeout={500}
      renderThumbHorizontal={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...thumbHorizontalStyle }} />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...thumbVerticalStyle }} />
      )}
      renderTrackHorizontal={({ style, ...props }) => (
        <div {...props} style={{ ...style, ...trackHorizontalStyle }} />
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
});

export default Scrollbar;
