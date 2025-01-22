import { SyntheticEvent } from "react";
import { FieldError } from "react-hook-form";

import { Autocomplete, Box, TextField } from "@mui/material";

import { NEED_TO_BE_ANY } from "@sharedTypes/globalTypes";

type Option = { [key: string]: NEED_TO_BE_ANY };

type SelectProps<T> = {
  options: Array<T> | undefined;
  value?: T;
  onChange?: <T extends Option>(event: SyntheticEvent, value: T | null) => void;
  error?: FieldError | undefined;
  helperText?: string | undefined;
  placeholder?: string | undefined;
};

const Select = <T extends Option>(props: SelectProps<T>) => {
  return (
    <Autocomplete
      {...props}
      autoHighlight
      getOptionLabel={(option: Option) => option.name}
      isOptionEqualToValue={(option: Option) =>
        option.name === props.value?.name
      }
      options={props.options || []}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!props.error}
          helperText={props.error?.message || ""}
          inputProps={{
            ...params.inputProps,
          }}
          placeholder={props.placeholder}
        />
      )}
      renderOption={(props, option) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line react/prop-types
        const { key, ...restProps } = props;
        const prop = { ...restProps };

        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...prop}
          >
            {option.flag && (
              <img
                alt=""
                loading="lazy"
                src={option.flag}
                srcSet={option.flag}
                width="20"
              />
            )}
            {option.name}
          </Box>
        );
      }}
      sx={{ width: 300 }}
      value={props.value || null}
      onChange={props.onChange}
    />
  );
};

export default Select;
