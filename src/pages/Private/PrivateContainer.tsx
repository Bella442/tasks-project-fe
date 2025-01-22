import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import Button from "@components/Button/Button";
import Header from "@components/Header/Header";
import MenuToggle from "@components/SideMenu/MenuToggle";
import SideMenu from "@components/SideMenu/SideMenu";
import { AUTHENTICATED } from "@constants/constants";

import NotFound from "@pages/Public/pages/NotFound/NotFound";

import { PRIVATE_ROUTES, ROUTES } from "@routes/routes";

import { isLoggedIn } from "@utils/utils";

import { SocketProvider } from "@webSocket/SocketProvider";

import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Hotels from "./pages/Hotels/Hotels";
import ServerCommunicationPage from "./pages/ServerCommunicationPage/ServerCommunicationPage";
import Table1Page from "./pages/Table1Page/Table1Page";
import Table2Page from "./pages/Table2Page/Table2Page";

const PrivateContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return isLoggedIn() ? (
    <>
      <Header>
        <MenuToggle />
        <Button
          style="background-color: inherit; color: inherit; margin-left: auto;"
          text={t("HEADER.BUTTONS.LOGOUT")}
          onClick={() => {
            localStorage.removeItem(AUTHENTICATED);
            navigate(ROUTES.LOGIN);
          }}
        />
      </Header>
      <SideMenu />
      <Grid container padding={3}>
        <SocketProvider>
          <Routes>
            <Route
              element={<Navigate to={ROUTES.HOME} />}
              path={ROUTES.BASE_ROUTE}
            />
            <Route element={<Home />} path={PRIVATE_ROUTES.HOME} />
            <Route element={<Hotels />} path={PRIVATE_ROUTES.HOTELS} />
            <Route
              element={<Table1Page />}
              path={PRIVATE_ROUTES.FIRST_TABLE_PAGE}
            />
            <Route
              element={<Table2Page />}
              path={PRIVATE_ROUTES.SECOND_TABLE_PAGE}
            />
            <Route
              element={<Dashboard />}
              path={PRIVATE_ROUTES.DASHBOARD_PAGE}
            />
            <Route
              element={<ServerCommunicationPage />}
              path={PRIVATE_ROUTES.SERVER_COMMUNICATION}
            />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </SocketProvider>
      </Grid>
    </>
  ) : (
    <Navigate replace to={ROUTES.LOGIN} />
  );
};

export default PrivateContainer;
