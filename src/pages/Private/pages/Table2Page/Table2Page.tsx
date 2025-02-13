import { useTranslation } from "react-i18next";

import { Grid } from "@mui/material";

import { useGetUniversityDataByCountryQuery } from "@api/shared/api";

import PageTitle from "@components/Texts/PageTitle";
import UniversityTable from "@pages/components/UniversityTable";

const Table2Page = () => {
  const { t } = useTranslation();
  const { data } = useGetUniversityDataByCountryQuery({ country: "Bulgaria" });

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item>
        <Grid item>
          <PageTitle text={t("TABLE_2_PAGE.TITLE")} />
        </Grid>
      </Grid>
      <Grid item>
        <UniversityTable data={data} />
      </Grid>
    </Grid>
  );
};

export default Table2Page;
