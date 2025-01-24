import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Grid } from "@mui/material";

import { useGetLoggedUserDataQuery } from "@api/users/usersApi";
import Button from "@components/Button/Button";
import ChatRoom from "@components/Chat/ChatRoom";
import Header from "@components/Header/Header";
import Scrollbar from "@components/Scrollbar/Scrollbar";
import MenuToggle from "@components/SideMenu/MenuToggle";
import SideMenu from "@components/SideMenu/SideMenu";
import { AUTHENTICATED } from "@constants/constants";

import { setLoggedUser } from "@pages/Public/pages/Login/loggedUserSlice";
import NotFound from "@pages/Public/pages/NotFound/NotFound";
import { PRIVATE_ROUTES, ROUTES } from "@routes/routes";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";

import { isLoggedIn } from "@utils/utils";

import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Hotels from "./pages/Hotels/Hotels";
import Table1Page from "./pages/Table1Page/Table1Page";
import Table2Page from "./pages/Table2Page/Table2Page";

const PrivateContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const { data: userData } = useGetLoggedUserDataQuery();

  useEffect(() => {
    if (!loggedUser && userData) {
      dispatch(setLoggedUser(userData));
    }
  }, [userData, navigate, dispatch, loggedUser]);

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
      <Scrollbar>
        <Grid container display="flex" height="100%" padding={3}>
          <Grid item width="100%">
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
              <Route element={<ChatRoom />} path={PRIVATE_ROUTES.CHAT} />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Grid>
        </Grid>
      </Scrollbar>
    </>
  ) : (
    <Navigate replace to={ROUTES.LOGIN} />
  );
};

export default PrivateContainer;
