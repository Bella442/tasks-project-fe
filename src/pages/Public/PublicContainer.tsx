import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Grid } from "@mui/material";

import Header from "@components/Header/Header";

import { ROUTES } from "@routes/routes";

import { isLoggedIn } from "@utils/utils";

import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Registration from "./pages/Registration/Registration";

const PublicContainer = () => {
  const location = useLocation();

  //Check if url is in defined routes. If it is present redirect to home page
  const routesArray = Array.from(Object.values(ROUTES));
  const isInArray = routesArray.some((value) => {
    return value === location.pathname;
  });

  return (
    <>
      <Header />
      {!isLoggedIn() ? (
        <Grid container padding={3}>
          <Routes>
            <Route
              element={<Navigate to={ROUTES.LOGIN} />}
              path={ROUTES.BASE_ROUTE}
            />
            <Route element={<Login />} path={ROUTES.LOGIN} />
            <Route element={<Registration />} path={ROUTES.REGISTRATION} />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Grid>
      ) : (
        <Routes>
          <Route
            element={isInArray ? <Navigate to={ROUTES.HOME} /> : <NotFound />}
            path="*"
          />
        </Routes>
      )}
    </>
  );
};

export default PublicContainer;
