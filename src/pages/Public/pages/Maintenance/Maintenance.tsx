import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

const Maintenance = () => {
  const { t } = useTranslation();

  return (
    <Grid container alignItems="center" flex={1} justifyContent="center">
      <Grid item>
        <Typography variant="h2">{t("MAINTENANCE_PAGE.MAIN_TEXT")}</Typography>
        <Typography variant="h3">
          {t("MAINTENANCE_PAGE.SECONDARY_TEXT")}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Maintenance;
