import { BaseSyntheticEvent, CSSProperties } from "react";

import { TextField } from "@mui/material";

interface InputFieldProps {
  value: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string | undefined;
  style?: CSSProperties;
  autoCompleteAttribute?: string;
  onChange: (event: BaseSyntheticEvent) => void;
}

const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      autoComplete={props.autoCompleteAttribute}
      error={props.error}
      helperText={props.helperText}
      label={props.label}
      placeholder={props.placeholder}
      style={props.style}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default InputField;
