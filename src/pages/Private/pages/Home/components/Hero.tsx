import { useTranslation } from "react-i18next";

import styled from "styled-components";

import { useTheme } from "@mui/material/styles";

import { SIZE } from "@theme/sizeOptions";

const HeroHeading = styled.h1`
  margin: 20px 0;
  ${(props) => props.theme.typography.h1};
`;

const HeroSubheading = styled.p`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: ${SIZE.X_LARGE};
`;

const Hero = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <HeroHeading theme={theme}>{t("HOME_PAGE.TITLE")}</HeroHeading>

      <HeroSubheading theme={theme}>
        Built for sci
        <span style={{ color: theme.palette.secondary.main }}>a</span>
        ntists by sci
        <span style={{ color: theme.palette.secondary.main }}>a</span>ntists
      </HeroSubheading>
    </>
  );
};

export default Hero;
