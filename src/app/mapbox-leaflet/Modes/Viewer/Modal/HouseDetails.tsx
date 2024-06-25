import { Box, Chip, Paper, Typography } from "@mui/material";
import Flex from "@/components/Layout/Flex";
import CancelButton from "@/app/mapbox-leaflet/Components/Modal/CancelButton";
import ContextPaper from "@/app/mapbox-leaflet/Components/Modal/ContextPaper";
import { useMap } from "react-leaflet";
import { centroid, extractCoordinates } from "@/app/mapbox-leaflet/utils";
import { BsHouseAdd } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { IoMdResize } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { useEffect } from "react";
import { houseDetailsOffset } from "@/app/mapbox-leaflet/consts";

interface Props {
  data: any;
  handleClose: () => void;
  handleConfirm?: () => void;
}

export default function HouseDetails({ data, handleClose }: Props) {
  const map = useMap();

  useEffect(() => {
    if (!!data.house?.id) {
      map.flyTo(
        centroid(extractCoordinates(data.coordinates), houseDetailsOffset),
        20,
        {
          duration: 1,
        },
      );
    }
  }, [data]);

  return (
    data.house?.id && (
      <ContextPaper sx={{ pt: 0, px: 0, maxWidth: "540px" }}>
        <div style={{ width: "540px", marginBottom: "40px" }}>
          <Slider
            arrows={false}
            autoplay
            autoplaySpeed={5000}
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {data.house.images?.map((item: any) => {
              return (
                <div key={item.id} style={{ borderRadius: "9px" }}>
                  <Image
                    src={item.url}
                    alt={"alt"}
                    height="304"
                    width="540"
                    style={{
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                    }}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <Box sx={{ px: 4 }}>
          <Typography
            variant="h5"
            sx={{ mb: 1, pt: 1, fontWeight: "bold", fontSize: 26 }}
          >
            {data.house.name}
          </Typography>
          <Chip
            style={{
              backgroundColor: data.house.label.color,
              color: "white",
            }}
            size="small"
            label={data.house.label.name}
          />
          <Typography sx={{ textAlign: "justify", px: 2, mt: 2 }}>
            {data.house.description}
          </Typography>
          <Flex sx={{ my: 4, px: 1 }} between>
            <Flex alignCenter sx={{ flex: 1 }}>
              <Box
                sx={{
                  backgroundColor: "#0eae81",
                  borderRadius: "9px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <IoMdResize
                  size={14}
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
              <Typography sx={{ ml: 1, fontSize: 16 }}>
                {data.house.size} m²
              </Typography>
            </Flex>
            <Flex alignCenter sx={{ flex: 1 }}>
              <Box
                sx={{
                  backgroundColor: "#0eae81",
                  borderRadius: "9px",
                  width: "25px",
                  height: "25px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <IoPersonSharp
                  size={14}
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
              <Typography sx={{ ml: 1, fontSize: 16 }}>
                {data.house.capacity}
              </Typography>
            </Flex>
          </Flex>
        </Box>
        <Flex end sx={{ gap: 1, px: 2 }}>
          <CancelButton onClick={handleClose}>Zamknij</CancelButton>
        </Flex>
      </ContextPaper>
    )
  );
}
