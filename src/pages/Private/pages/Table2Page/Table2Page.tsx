import { useTranslation } from "react-i18next";

import { Grid } from "@mui/material";

import { useGetUniversityDataByCountryQuery } from "@api/shared/api";

import PageTitle from "@components/Texts/PageTitle";
import UniversityTable from "@pages/components/UniversityTable";

import { useAppSelector } from "@store/hooks/hooks";
import { RootState } from "@store/store";

const Table2Page = () => {
  const { t } = useTranslation();

  const country = useAppSelector(
    (state: RootState) => state.table1Page.country,
  );
  const { data } = useGetUniversityDataByCountryQuery({ country });

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
