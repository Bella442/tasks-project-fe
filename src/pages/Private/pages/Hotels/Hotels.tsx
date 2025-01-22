import { t } from "i18next";

import Grid from "@mui/material/Grid";

import PageTitle from "@components/Texts/PageTitle";

import NoDataComponent from "@pages/components/NoDataComponent";

import HotelCard from "./components/HotelCard";
import HotelCardSkeleton from "./components/HotelCardSkeleton";
import { useGetHotelsDataQuery } from "./hotels.api";

const Hotels = () => {
  const { data: hotelsData = [], isLoading } = useGetHotelsDataQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle text={t("HOTELS_PAGE.TITLE")} />
      </Grid>
      <Grid container item justifyContent="center" spacing={6}>
        {(isLoading ? Array.from(new Array(8)) : hotelsData).map(
          (hotel, index) => (
            <Grid key={hotel ? hotel.id : index} item>
              {hotel ? <HotelCard hotelData={hotel} /> : <HotelCardSkeleton />}
            </Grid>
          ),
        )}
      </Grid>
      {!isLoading && hotelsData.length === 0 && <NoDataComponent />}
    </Grid>
  );
};

export default Hotels;
