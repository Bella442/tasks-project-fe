import { Control, Controller, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface RadioOption {
  label: string;
  value: string;
}

interface FormRadioGroupProps {
  label?: string;
  name: string;
  control: unknown;
  rules?: object;
  options: Array<RadioOption>;
}

const FormRadioGroup = (props: FormRadioGroupProps) => {
  const generateRadioOptions = () => {
    return props.options?.map((singleOption: RadioOption) => (
      <FormControlLabel
        key={singleOption.value}
        control={<Radio />}
        label={singleOption.label}
        value={singleOption.value}
      />
    ));
  };

  return (
    <Controller
      control={props.control as Control<FieldValues>}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl>
          <FormLabel>{props.label}</FormLabel>
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
          {error && (
            <FormHelperText style={{ color: "#d32f2f" }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
      rules={props.rules}
    />
  );
};

export default FormRadioGroup;
