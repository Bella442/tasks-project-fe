import { BaseSyntheticEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, Divider, Grid } from "@mui/material";

import { useGetUniversityDataByCountryQuery } from "@api/shared/api";

import Button from "@components/Button/Button";
import InputField from "@components/Input/InputField";
import Loader from "@components/Loader/Loader";
import PageTitle from "@components/Texts/PageTitle";

import { GlobalDialogContext } from "@contexts/globalDialogContext";

import { updateCountry } from "@pages/Private/pages/Table1Page/table1PageSlice";
import UniversityTable from "@pages/components/UniversityTable";

import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";

const Table1Page = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.table1Page.country);
  const { openDialog, closeDialog } = useContext(GlobalDialogContext);
  const [skip, setSkip] = useState(false);
  const { data, isLoading } = useGetUniversityDataByCountryQuery(
    { country },
    {
      skip,
    },
  );

  const submitForm = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setSkip(false);
    openDialog({
      title: "You performed new search", //TODO: Remove when we have another dialog #38
      content: (
        <Box>
          <div>Some content</div>
        </Box>
      ),
      buttonHandlers: [
        { text: "OK", onClick: () => closeDialog(), autoFocus: true },
      ],
    });
  };

  return (
    <Grid container flexDirection="column" spacing={2}>
      <Grid item>
        <PageTitle text={t("TABLE_1_PAGE.TITLE")} />
      </Grid>
      <Grid item marginTop={3}>
        <form style={{ display: "flex" }} onSubmit={(e) => submitForm(e)}>
          <Grid container alignItems="center" display="flex" spacing={2}>
            <Grid item>
              <InputField
                label={t("COMMON.LABELS.COUNTRY")}
                placeholder={t("TABLE_1_PAGE.INPUT.PLACEHOLDER")}
                type="text"
                value={country}
                onChange={(e) => {
                  setSkip(true);
                  dispatch(updateCountry(e.target.value));
                }}
              />
            </Grid>
            <Grid item>
              <Button text={t("COMMON.BUTTONS.SEARCH")} type="submit" />
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid item>
          <UniversityTable data={data} />
        </Grid>
      )}
    </Grid>
  );
};

export default Table1Page;
