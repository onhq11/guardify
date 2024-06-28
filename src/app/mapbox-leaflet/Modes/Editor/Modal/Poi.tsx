import ContextPaper from "@/app/mapbox-leaflet/Components/Modal/ContextPaper";
import {
  CircularProgress,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Flex from "@/components/Layout/Flex";
import { createElement, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { defaultPoiColor, iconOptions } from "@/app/mapbox-leaflet/consts";
import SaveButton from "@/app/mapbox-leaflet/Components/Modal/SaveButton";
import CancelButton from "@/app/mapbox-leaflet/Components/Modal/CancelButton";
import { Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useSnackbar } from "notistack";
import {
  extractCoordinates,
  packCoordinates,
} from "@/app/mapbox-leaflet/utils";

interface Props {
  data: any;
  handleReset: () => void;
  handleReload: () => void;
}

export default function Poi({ data, handleReset, handleReload }: Props) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("parking");
  const [iconSvg, setIconSvg] = useState<any>({});
  const [color, setColor] = useState<any>({ hex: defaultPoiColor });
  const [currentPosition, setCurrentPosition] =
    useState<LatLngExpression | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setName(data.name || "");
    setIcon(data.icon || "parking");
    setIconSvg({});
    setColor({ hex: data.color || defaultPoiColor });
    setCurrentPosition(
      !!data.coordinates
        ? extractCoordinates(data.coordinates)[0]
        : !!data.position
          ? data.position
          : null,
    );
  }, [data]);

  useEffect(() => {
    let svgString = iconOptions.find((item) => item.value === icon)?.svg;
    if (!svgString) {
      setIconSvg({});
      return;
    }

    svgString = svgString.replace(
      /fill="currentColor+"/g,
      `fill="${color.hex}"`,
    );

    const iconSvg = L.icon({
      iconUrl: "data:image/svg+xml;base64," + btoa(svgString),
      iconSize: [30, 30],
    });
    setIconSvg(iconSvg);
  }, [icon, color]);

  const handleConfirm = (coords: LatLngExpression | null) => {
    if (!coords) return;

    if (!!data.id) {
      fetch("https://domki.szurag.pl/api/marker/" + data.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
          icon: icon,
          color: color.hex,
          coordinates: packCoordinates([coords]),
        }),
      }).finally(() => {
        enqueueSnackbar("Pomyślnie edytowano pole", { variant: "success" });
        handleReload();
        handleReset();
      });
      return;
    }

    fetch("https://domki.szurag.pl/api/marker", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        icon: icon,
        color: color.hex,
        coordinates: packCoordinates([coords]),
      }),
    }).finally(() => {
      enqueueSnackbar("Pomyślnie dodano pole", { variant: "success" });
      handleReload();
      handleReset();
    });
  };

  return (
    (!!data.coordinates || !!data.position) && (
      <ContextPaper>
        <Typography>{!!data.id ? "Edytuj" : "Dodaj"} POI</Typography>
        <TextField
          sx={{ mt: 2 }}
          size="small"
          label="Nazwa"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <Flex sx={{ my: 2 }}>
          <RadioGroup
            row
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
          >
            {iconOptions.length > 0 &&
              iconOptions.map(
                (item: any, itemIndex: number) =>
                  !!item?.value && (
                    <FormControlLabel
                      label=""
                      key={itemIndex}
                      sx={{ m: 0.75 }}
                      value={item.value}
                      control={
                        <Radio
                          sx={{ p: 0 }}
                          icon={
                            <Paper
                              sx={{
                                p: 1,
                                backgroundColor: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              {!!item.icon &&
                                createElement(item.icon, { size: 30 })}
                              {item.label}
                            </Paper>
                          }
                          checkedIcon={
                            <Paper
                              sx={{
                                p: 1,
                                backgroundColor: "#669edf",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              {!!item.icon &&
                                createElement(item.icon, { size: 30 })}
                              {item.label}
                            </Paper>
                          }
                        />
                      }
                    />
                  ),
              )}
          </RadioGroup>
        </Flex>
        <Flex sx={{ my: 2 }}>
          <TwitterPicker
            color={color}
            onChange={(color) => setColor(color)}
            triangle="hide"
            width="100%"
          />
        </Flex>
        <Flex center sx={{ mt: 4 }}>
          <Flex
            column
            alignCenter
            sx={{
              gap: 1,
              border: "1px solid #c4c4c4",
              p: 1,
              borderRadius: "9px",
              ...(!!color?.hex && { color: color.hex }),
            }}
          >
            <Typography sx={{ color: "#000" }}>Podgląd</Typography>
            {!!iconOptions?.find((item: any) => item.value === icon) ? (
              createElement(
                iconOptions?.find((item: any) => item.value === icon)?.icon,
                { size: 30 },
              )
            ) : (
              <Flex>
                <CircularProgress />
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex end sx={{ gap: 1 }}>
          <CancelButton onClick={handleReset} />
          <SaveButton onClick={() => handleConfirm(currentPosition)} />
        </Flex>
        {!!currentPosition && (
          <Marker
            position={currentPosition}
            {...(!!iconSvg.options && { icon: iconSvg })}
            draggable
            eventHandlers={{
              dragend: (e) =>
                setCurrentPosition([
                  e.target._latlng.lat,
                  e.target._latlng.lng,
                ]),
            }}
          >
            <Popup>{name}</Popup>
          </Marker>
        )}
      </ContextPaper>
    )
  );
}
