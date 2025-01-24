import { useEffect } from "react";

import { useTranslation } from "react-i18next";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { GoogleLogin } from "@react-oauth/google";

import { Grid } from "@mui/material";

import { useLoginMutation } from "@api/auth/authApi";
import PageTitle from "@components/Texts/PageTitle";
import Paragraph from "@components/Texts/Paragraph";

import { AUTHENTICATED } from "@constants/constants";
import { ROUTES } from "@routes/routes";

import { useAppDispatch } from "@store/hooks/hooks";
import { isStringVariableTrue } from "@utils/utils";

import LoginForm from "./components/LoginForm";
import { setLoggedUser } from "./loggedUserSlice";
import { LoginData } from "./types";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [login, result] = useLoginMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (result.data && result.data.accessToken) {
      localStorage.setItem(AUTHENTICATED, "true");
      localStorage.setItem("token", result.data.accessToken);
      dispatch(setLoggedUser(result.data.user));
      toast.success(t("LOGIN_PAGE.SNACKBAR.SUCCESS_LOGIN"));
      navigate(ROUTES.HOME);
    } else if (result.error) {
      toast.error(result.error.toString());
    }
  }, [navigate, result, t, dispatch]);

  const googleEnabled = isStringVariableTrue(
    import.meta.env.VITE_ENABLE_GOOGLE_LOGIN,
  );

  const registrationLink = (
    <Link to={ROUTES.REGISTRATION}>{t("COMMON.LINKS.HERE")}</Link>
  );

  useEffect(() => {
    if (location?.state?.redirectFromRegistration) {
      toast.info(t("LOGIN_PAGE.SNACKBAR.CONFIRM_REGISTRATION"), {
        position: "top-center",
      });
      location.state.redirectFromRegistration = false;
    }
  }, [location, t]);

  const handleLogin = (data: LoginData) => {
    login(data);
  };

  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      flexDirection="column"
      rowSpacing={2}
    >
      <Grid item>
        <PageTitle text={t("LOGIN_PAGE.TITLE")} />
      </Grid>
      <Grid item>
        <LoginForm handleLogin={handleLogin} />
      </Grid>
      <Grid
        item
        alignItems="center"
        display="flex"
        flexDirection="column"
        paddingTop="0px !important"
      >
        <Paragraph>
          {t("LOGIN_PAGE.LABELS.STILL_NOT_REGISTERED")}
          {registrationLink}
          {`${googleEnabled ? " or" : "."}`}
        </Paragraph>
        {googleEnabled && (
          <GoogleLogin
            theme="outline"
            onError={() => {
              console.info(t("LOGIN_PAGE.ERRORS_LOGIN_FAILED"));
            }}
            onSuccess={() => {}}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
