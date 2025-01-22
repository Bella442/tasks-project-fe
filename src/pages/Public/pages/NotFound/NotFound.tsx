import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Grid } from "@mui/material";

import PageTitle from "@components/Texts/PageTitle";

import { ROUTES } from "@routes/routes";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Grid container alignItems="center" display="flex" flexDirection="column">
      <Grid item>
        <PageTitle text={t("NOT_FOUND_PAGE.MAIN_TEXT")} />
        <Link to={ROUTES.HOME}>{t("NOT_FOUND_PAGE.LINK_TEXT")}</Link>
      </Grid>
    </Grid>
  );
};

export default NotFound;
