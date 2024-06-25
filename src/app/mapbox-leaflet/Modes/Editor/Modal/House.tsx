import { TextField, Typography } from "@mui/material";
import Flex from "@/components/Layout/Flex";
import { TwitterPicker } from "react-color";
import ContextPaper from "@/app/mapbox-leaflet/Components/Modal/ContextPaper";
import { useEffect, useState } from "react";
import {
  createPolygonCoords,
  defaultHouseColor,
  defaultPoiColor,
  polygonTooltipOptions,
} from "@/app/mapbox-leaflet/consts";
import CancelButton from "@/app/mapbox-leaflet/Components/Modal/CancelButton";
import SaveButton from "@/app/mapbox-leaflet/Components/Modal/SaveButton";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useSnackbar } from "notistack";
import Houses from "@/app/mapbox-leaflet/Modes/Editor/Modal/Houses";

interface Props {
  data: any;
  handleReset: () => void;
  handleReload: () => void;
}

export default function House({ data, handleReset, handleReload }: Props) {
  const map = useMap();
  const [previewPolygon, setPreviewPolygon] = useState<any>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState<any>({ hex: defaultPoiColor });
  const [house, setHouse] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  const generateCoords = () => {
    return !!previewPolygon
      ? previewPolygon.getLatLngs()
      : data.coordinates ||
          createPolygonCoords(data.position[0], data.position[1]);
  };

  useEffect(() => {
    setPreviewPolygon(null);
    setName(data.name || "");
    setColor({ hex: data.color || defaultHouseColor });
    setHouse(data.house || {});
  }, [data]);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (
        layer instanceof L.Polygon &&
        // @ts-ignore
        (layer.options?.id === "new" ||
          // @ts-ignore
          (!!data.id && layer.options.id === data.id))
      ) {
        // @ts-ignore
        layer.transform.disable();
        map.removeLayer(layer);
      }
    });

    if (data.coordinates || data.position) {
      const polygonCoords = generateCoords();
      const poly = L.polygon(polygonCoords, {
        color: color.hex,
        fillOpacity: 0.8,
        // @ts-ignore
        transform: true,
        draggable: true,
        id: "new",
      }).addTo(map);

      // @ts-ignore
      poly.transform?.enable({ scaling: true, rotation: true });
      poly.bindTooltip(name, polygonTooltipOptions);

      poly.on("dragstart", (e) => {
        e.target.unbindTooltip();
      });

      poly.on("dragend", (e) => {
        e.target
          .bindTooltip(name, polygonTooltipOptions)
          .openTooltip(e.target.getCenter());
      });

      poly.on("scalestart", (e) => {
        e.target.unbindTooltip();
      });

      poly.on("scaleend", (e) => {
        e.target
          .bindTooltip(name, polygonTooltipOptions)
          .openTooltip(e.target.getCenter());
      });

      setPreviewPolygon(poly);
    }
  }, [name, color, data.position, data.coordinates]);

  const handleConfirm = (coords: Array<Array<LatLngExpression>>) => {
    if (!!data.id) {
      fetch("https://domki.szurag.pl/api/polygon/" + data.id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          house_id: house.id,
          color: color.hex,
          name: name,
          coordinates: coords[0],
        }),
      }).finally(() => {
        enqueueSnackbar("Pomyślnie edytowano pole", { variant: "success" });
        handleReload();
        handleReset();
      });
      return;
    }

    fetch("https://domki.szurag.pl/api/polygon", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        house_id: house.id,
        color: color.hex,
        name: name,
        coordinates: coords[0],
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
        <Typography>{!!data.id ? "Edytuj" : "Dodaj"} pole</Typography>
        <TextField
          sx={{ mt: 2 }}
          size="small"
          label="Nazwa"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <Houses handleConfirm={(value) => setHouse(value)} modalData={house} />
        <Flex sx={{ my: 2 }}>
          <TwitterPicker
            color={color}
            onChange={(color) => setColor(color)}
            triangle="hide"
          />
        </Flex>
        <Flex end sx={{ gap: 1 }}>
          <CancelButton onClick={handleReset} />
          <SaveButton onClick={() => handleConfirm(generateCoords())} />
        </Flex>
      </ContextPaper>
    )
  );
}
