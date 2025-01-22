import styled from "styled-components";

import { useTheme } from "@mui/material/styles";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void;
  style?: string;
  autoFocus?: boolean;
}

const StyledButton = styled.button<{ $style: string }>`
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.white.main};
  text-transform: none;
  font-size: ${(props) => props.theme.typography.htmlFontSize}px;
  font-weight: 600;
  ${(props) => props.$style}
`;

const Button = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <StyledButton
      $style={props.style || ""}
      autoFocus={props.autoFocus}
      theme={theme}
      type={props.type}
      onClick={props.onClick}
    >
      {props.text}
    </StyledButton>
  );
};

export default Button;
