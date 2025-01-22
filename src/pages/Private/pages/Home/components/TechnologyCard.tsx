import { useTranslation } from "react-i18next";

import styled from "styled-components";

import { Box, Typography, useTheme } from "@mui/material";

import Icon, { IconNames } from "@components/Icon/Icon";

export interface TechnologyCardProps {
  icon: IconNames;
  url: string;
  actionText: string;
}

const CustomCard = styled.div`
  border-radius: 16px;
  box-shadow: 0 6px 20px 0 #dbdbe8;
  background-color: ${(props) => props.theme.palette.white.main};
  display: flex;
  align-items: center;
  padding: 16px;
  width: 400px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 32px 0
      ${(props) => props.theme.palette.secondary.main + 99};
  }

  @media (max-width: 490px) {
    width: 250px;
    min-height: 115px;
  }
`;

const StyledBox = styled(Box)`
  height: 160px;
  width: 160px;
  margin-right: 8px;

  @media only screen and (max-width: 490px) {
    height: 60px;
    width: 60px;
  }

  @media only screen and (min-width: 491px) and (max-width: 1100px) {
    height: 100px;
    width: 100px;
  }
`;

const TechnologyCard = (props: TechnologyCardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <CustomCard theme={theme} onClick={() => window.open(props.url, "_blank")}>
      <StyledBox>
        <Icon height="100%" icon={props.icon} width="100%" />
      </StyledBox>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography>{t(props.actionText)}</Typography>
        <Typography variant="h3">{t(props.icon)}</Typography>
      </Box>
    </CustomCard>
  );
};

export default TechnologyCard;
