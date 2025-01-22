import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display="flex" justifyContent="center" marginTop="16px">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
