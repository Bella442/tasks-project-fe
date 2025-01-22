import { Grid } from "@mui/material";

import { usedTechnologies } from "@constants/constants";

import TechnologyCard from "./TechnologyCard";

const TechnologiesGrid = () => {
  return (
    <Grid
      container
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      maxWidth="1400px"
      spacing={2}
    >
      {usedTechnologies.map((technology, index) => (
        <Grid key={index} item>
          <TechnologyCard {...technology}></TechnologyCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default TechnologiesGrid;
