import { useTranslation } from "react-i18next";

import { Grid, Typography } from "@mui/material";

import Hero from "./components/Hero";
import TechnologiesGrid from "./components/TechnologiesGrid";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Grid container display="flex" flexDirection="column" spacing={5}>
      <Grid item>
        <Hero />
      </Grid>

      <Grid item alignItems="center" display="flex" flexDirection="column">
        <Typography marginBottom="24px" variant="h2">
          {t("HOME_PAGE.CONTAINER_TITLE")}
        </Typography>
        <TechnologiesGrid />
      </Grid>
    </Grid>
  );
};

export default Home;
