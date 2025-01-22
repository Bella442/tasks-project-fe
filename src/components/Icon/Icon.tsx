import React, { CSSProperties, FC, LazyExoticComponent, Suspense } from "react";

import Loader from "@components/Loader/Loader";
import { COMPONENT_NOT_FOUND } from "@constants/constants";

const ReactIcon = React.lazy(() => import("./SvgIcons/ReactIcon"));
const ViteIcon = React.lazy(() => import("./SvgIcons/ViteIcon"));
const ReduxIcon = React.lazy(() => import("./SvgIcons/ReduxIcon"));
const RouterIcon = React.lazy(() => import("./SvgIcons/RouterIcon"));
const MuiIcon = React.lazy(() => import("./SvgIcons/MuiIcon"));
const VitestIcon = React.lazy(() => import("./SvgIcons/VitestIcon"));

export interface IconProps {
  icon: IconNames;
  color?: string;
  customStyle?: CSSProperties;
  height?: number | string;
  width?: number | string;
}

export interface SvgProps {
  color?: string;
  customStyle?: CSSProperties;
  height?: number | string;
  width?: number | string;
}

export enum IconNames {
  React = "React",
  Vite = "Vite",
  ReduxToolkit = "Redux Toolkit",
  ReactRouterDOM = "React Router DOM",
  MaterialUI = "MaterialUI",
  Vitest = "Vitest",
}

const ICON_PATH: {
  [key in IconNames]: LazyExoticComponent<FC<SvgProps>>;
} = {
  [IconNames.React]: ReactIcon,
  [IconNames.Vite]: ViteIcon,
  [IconNames.ReduxToolkit]: ReduxIcon,
  [IconNames.ReactRouterDOM]: RouterIcon,
  [IconNames.MaterialUI]: MuiIcon,
  [IconNames.Vitest]: VitestIcon,
};

const Icon: React.FC<IconProps> = ({
  customStyle,
  icon,
  color,
  height,
  width,
}) => {
  const SvgComponent = ICON_PATH[icon];

  if (!SvgComponent) {
    return <div>{COMPONENT_NOT_FOUND}</div>;
  }

  return (
    <Suspense fallback={<Loader />}>
      <SvgComponent
        color={color}
        customStyle={customStyle}
        height={height}
        width={width}
      />
    </Suspense>
  );
};

export default Icon;
