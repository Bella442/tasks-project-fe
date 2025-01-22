import { Grid } from "@mui/material";

import PageTitle from "@components/Texts/PageTitle";
import { NO_RECORDS_TO_DISPLAY } from "@constants/constants";

const NoDataComponent = () => {
  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      flexDirection="column"
      marginTop={"40px"}
    >
      <Grid item>
        <PageTitle text={NO_RECORDS_TO_DISPLAY} />
      </Grid>
    </Grid>
  );
};

export default NoDataComponent;
