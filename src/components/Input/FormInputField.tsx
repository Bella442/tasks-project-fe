import { Control, Controller, FieldValues } from "react-hook-form";

import InputField from "./InputField";

interface FormInputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  control: unknown;
  rules?: object;
  autoCompleteAttribute?: string;
}

const FormInputField = (props: FormInputFieldProps) => {
  return (
    <Controller
      control={props.control as Control<FieldValues>}
      name={props.name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoCompleteAttribute={props.autoCompleteAttribute}
          error={!!error}
          helperText={error ? error.message : ""}
          label={props.label}
          placeholder={props.placeholder}
          type={props.type}
          value={value}
          onChange={onChange}
        />
      )}
      rules={props.rules}
    />
  );
};

export default FormInputField;
