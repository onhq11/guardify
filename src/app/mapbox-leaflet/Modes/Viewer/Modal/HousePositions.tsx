import { Paper, Typography } from "@mui/material";
import Flex from "@/components/Layout/Flex";
import CancelButton from "@/app/mapbox-leaflet/Components/Modal/CancelButton";
import ContextPaper from "@/app/mapbox-leaflet/Components/Modal/ContextPaper";
import { useMap } from "react-leaflet";
import { centroid, extractCoordinates } from "@/app/mapbox-leaflet/utils";
import { BsHouseAdd } from "react-icons/bs";

interface Props {
  data: any;
  handleClose: () => void;
  handleConfirm?: () => void;
}

export default function HousePositions({ data, handleClose }: Props) {
  const map = useMap();

  return (
    data?.polygons?.length > 0 && (
      <ContextPaper>
        <Typography>Wybierz miejsce</Typography>
        <Flex column sx={{ my: 2, gap: 1 }}>
          {data.polygons.map((polygon: any, index: number) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": { backgroundColor: "#fafafa" },
                "&:active": { backgroundColor: "#eee" },
                border: "1px solid #ddd",
                borderRadius: "9px",
              }}
              onClick={() => {
                map.flyTo(
                  centroid(extractCoordinates(polygon.coordinates)),
                  22,
                  { duration: 1 },
                );
              }}
              elevation={0}
            >
              <Flex sx={{ gap: 2 }}>
                <BsHouseAdd color={polygon.color} size={25} />
                <Typography>{polygon.name}</Typography>
              </Flex>
            </Paper>
          ))}
        </Flex>
        <Flex end sx={{ gap: 1 }}>
          <CancelButton onClick={handleClose}>Zamknij</CancelButton>
        </Flex>
      </ContextPaper>
    )
  );
}
