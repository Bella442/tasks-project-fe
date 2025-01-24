import { BaseSyntheticEvent, CSSProperties } from "react";

import { SxProps, TextField, Theme } from "@mui/material";

interface InputFieldProps {
  autoFocus?: boolean | undefined;
  value: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string | undefined;
  style?: CSSProperties;
  autoCompleteAttribute?: string;
  onChange: (event: BaseSyntheticEvent) => void;
  sx?: SxProps<Theme> | undefined;
  size?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const InputField = (props: InputFieldProps) => {
  return (
    <TextField
      autoComplete={props.autoCompleteAttribute}
      autoFocus={props.autoFocus}
      error={props.error}
      helperText={props.helperText}
      label={props.label}
      placeholder={props.placeholder}
      style={props.style}
      sx={props.sx}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default InputField;
