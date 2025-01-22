import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";

const HotelCardSkeleton = () => {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia>
        <Skeleton
          height={140}
          style={{ marginBottom: "10px" }}
          variant="rectangular"
          width="100%"
        />
      </CardMedia>
      <CardContent>
        <Skeleton
          height={18}
          style={{ marginBottom: "4px" }}
          variant="rounded"
          width="80%"
        />
        <Skeleton
          height={14}
          style={{ marginBottom: "10px" }}
          variant="rounded"
          width="40%"
        />
        <Skeleton
          height={62}
          style={{ marginBottom: "10px" }}
          variant="rounded"
          width="100%"
        />
      </CardContent>
      <CardActions>
        <Skeleton height={14} variant="rounded" width="30%" />
      </CardActions>
    </Card>
  );
};

export default HotelCardSkeleton;
