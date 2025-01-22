import { ReactNode } from "react";

import styled from "styled-components";

import { useTheme } from "@mui/material/styles";

interface IStyledFormProps {
  text?: string;
  style?: string;
  noValidate?: boolean;
  children: ReactNode[];
  onSubmit?: () => void;
}

export const StyledForm = styled.form<{ $style: string }>`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.spacing(2)};
  ${(props) => props.$style}
`;

const Form = (props: IStyledFormProps) => {
  const theme = useTheme();

  return (
    <StyledForm
      $style={props.style || ""}
      noValidate={props.noValidate || false}
      theme={theme}
      onSubmit={props.onSubmit}
    >
      {props.text}
      {props.children}
    </StyledForm>
  );
};

export default Form;
