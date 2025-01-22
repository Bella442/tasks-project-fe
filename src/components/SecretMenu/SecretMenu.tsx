import { ChangeEvent, useEffect, useState } from "react";

import { Drawer, FormControlLabel, Grid, Switch } from "@mui/material";

import { ENABLE_MOCKING } from "@constants/constants";

import { getLocalStorageItemBoolean } from "@utils/utils";

interface SecretMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const SecretMenu = (props: SecretMenuProps) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(getLocalStorageItemBoolean(ENABLE_MOCKING));
  }, []);

  window.addEventListener("storage", () => {
    setChecked(getLocalStorageItemBoolean(ENABLE_MOCKING));
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(ENABLE_MOCKING, e.target.checked.toString());
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <Drawer anchor="top" open={props.open} onClose={() => props.setOpen(false)}>
      <Grid container padding={2}>
        <Grid item>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleOnChange} />}
            label="Enable mock server"
          />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default SecretMenu;
