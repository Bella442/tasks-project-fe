import { CSSProperties } from "react";

export interface Props {
  height?: number | string;
  width?: number | string;
  customStyle?: CSSProperties;
}

const ReactIcon = (props: Props) => {
  return (
    <svg
      height={props.height}
      style={props.customStyle}
      viewBox="-11.5 -10.23174 23 20.46348"
      width={props.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>React Logo</title>
      <circle cx="0" cy="0" fill="#61dafb" r="2.05" />
      <g fill="none" stroke="#61dafb" strokeWidth="1">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
};

export default ReactIcon;
