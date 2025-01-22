import { useState } from "react";
import { Link } from "react-router-dom";

import { t } from "i18next";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HotelCardSkeleton from "./HotelCardSkeleton";
import { THotelData } from "../hotels.types";

export interface IHotelCardProps {
  hotelData: THotelData;
}

const HotelCard = ({ hotelData }: IHotelCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { Title, Image, Description, Destination, MapUrl } = hotelData;

  return (
    <>
      {imageLoading && <HotelCardSkeleton />}
      <Card
        sx={{
          maxWidth: 345,
          display: imageLoading ? "none" : "block",
        }}
      >
        <CardMedia>
          <img
            alt={Title}
            src={Image}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
            }}
            onLoad={() => setImageLoading(false)}
          />
        </CardMedia>
        <CardContent>
          <Typography textAlign="left" textTransform="uppercase" variant="h4">
            {Title}
          </Typography>
          <Typography textAlign="left">{Destination}</Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
            textAlign="left"
          >
            {Description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link target="_blank" to={MapUrl}>
            <Stack direction="row" spacing={1}>
              <LocationOnIcon />
              {t("HOTELS_PAGE.HOTEL_CARD.DIRECTIONS")}
            </Stack>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default HotelCard;
