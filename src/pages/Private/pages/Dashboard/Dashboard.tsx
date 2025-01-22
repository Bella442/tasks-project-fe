import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { VictoryPie, VictoryLabel } from "victory";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarIcon from "@mui/icons-material/Star";
import {
  Avatar,
  Grid,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Loader from "@components/Loader/Loader";
import PageTitle from "@components/Texts/PageTitle";
import NoDataComponent from "@pages/components/NoDataComponent";

import { useGetCharDataQuery } from "./dashboard.api";

const Dashboard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: chartData = [], isLoading } = useGetCharDataQuery();

  const chartColors = [
    theme.palette.pearlAqua.main,
    theme.palette.grapePurple.main,
    theme.palette.periwinkleGrey.main,
    theme.palette.camoGreen.main,
    theme.palette.basketBallOrange.main,
  ];
  const sortedData = useMemo(() => {
    return [...chartData].sort((a, b) => b.value - a.value);
  }, [chartData]);

  const transformedChartData = useMemo(() => {
    return chartData.map((item) => ({
      x: t(item.label),
      y: item.value,
    }));
  }, [chartData, t]);

  if (isLoading) {
    return (
      <Grid container item justifyContent="center" xs={12}>
        <Grid container item justifyContent="center" md={6} xs={12}>
          <Loader />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle text={t("DASHBOARD_PAGE.TITLE")} />
      </Grid>
      {chartData.length > 0 ? (
        <Grid container item justifyContent="center" xs={12}>
          <Grid container item justifyContent="center" md={6} xs={12}>
            <VictoryPie
              animate={{
                duration: 2000,
                easing: "circleIn",
                onLoad: {
                  duration: 500,
                  before: () => ({ _y: 1, label: "" }),
                  after: (datum) => ({ _y: datum._y }),
                },
              }}
              colorScale={chartColors}
              data={transformedChartData}
              height={300}
              labelComponent={
                <VictoryLabel
                  dx={({ datum }) =>
                    datum.x === t("DASHBOARD_PAGE.STATISTICS.CSS")
                      ? 3
                      : datum.x === t("DASHBOARD_PAGE.STATISTICS.HTML")
                        ? 10
                        : 0
                  }
                  dy={({ datum }) =>
                    datum.x === t("DASHBOARD_PAGE.STATISTICS.CSS")
                      ? -3
                      : datum.x === t("DASHBOARD_PAGE.STATISTICS.HTML")
                        ? 15
                        : 0
                  }
                  style={{ fontSize: 12 }}
                />
              }
              labels={({ datum }) => `${datum.x}`}
              width={400}
            />
          </Grid>

          <Grid container item justifyContent="center" md={6} xs={12}>
            <List sx={{ marginTop: "40px" }}>
              {sortedData.map((item, index) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: chartColors[index % chartColors.length] }}
                    >
                      {index === 0 ? <StarIcon /> : <FiberManualRecordIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${t(item.label)} - ${item.value}%`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      ) : (
        <NoDataComponent />
      )}
    </Grid>
  );
};

export default Dashboard;
