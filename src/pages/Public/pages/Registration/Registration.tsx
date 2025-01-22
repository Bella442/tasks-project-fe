import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import Button from "@components/Button/Button";
import PageTitle from "@components/Texts/PageTitle";

import RegistrationForm from "./components/RegistrationForm";

const Registration = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      flexDirection="column"
      rowSpacing={2}
    >
      <Grid container item display="grid">
        <Grid item justifySelf="flex-start">
          <Button
            text={t("COMMON.BUTTONS.BACK")}
            onClick={() => navigate(-1)}
          />
        </Grid>
        <Grid item justifySelf="center">
          <PageTitle text={t("COMMON.BUTTONS.SIGN_UP")} />
        </Grid>
      </Grid>
      <Grid item>
        <RegistrationForm />
      </Grid>
    </Grid>
  );
};

export default Registration;
