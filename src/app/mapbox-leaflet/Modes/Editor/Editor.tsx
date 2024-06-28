import {
  editorModes,
  EditorModes,
  editorModeTooltips,
} from "@/app/mapbox-leaflet/consts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import L from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import Poi from "@/app/mapbox-leaflet/Modes/Editor/Modal/Poi";
import House from "@/app/mapbox-leaflet/Modes/Editor/Modal/House";
import { isHouse, isIdle, isPoi } from "@/app/mapbox-leaflet/utils";
import { useSnackbar } from "notistack";

interface Props {
  editorMode: EditorModes;
  handleReloadHouses: () => void;
  handleReloadMarkers: () => void;
  markers: Array<any>;
  setMarkers: Dispatch<SetStateAction<Array<any>>>;
  houses: Array<any>;
}

export default function Editor({
  editorMode,
  handleReloadHouses,
  handleReloadMarkers,
  markers,
  setMarkers,
  houses,
}: Props) {
  const [tooltip, setTooltip] = useState<any>(null);
  const [lastTooltip, setLastTooltip] = useState("");
  const [data, setData] = useState<any>({});
  const { enqueueSnackbar } = useSnackbar();

  const map = useMap();
  const mapEvents = useMapEvents({
    click: (e) => {
      if (!!data.position) return;

      switch (editorMode) {
        case editorModes.POI_CREATE:
          setData({
            position: [e.latlng.lat, e.latlng.lng],
          });
          break;

        case editorModes.HOUSE_CREATE:
          setData({
            position: [e.latlng.lat, e.latlng.lng],
          });
          break;
      }
    },
  });

  useEffect(() => {
    if (isIdle(editorMode)) {
      setData({});
    }

    map.eachLayer((layer) => {
      layer.off("click");

      if (
        (isPoi(editorMode) && layer instanceof L.Marker) ||
        (isHouse(editorMode) && layer instanceof L.Polygon)
      ) {
        layer.on("click", (e) => {
          switch (editorMode) {
            case editorModes.POI_EDIT:
              setMarkers((item: Array<any>) => {
                const newData = [...item];
                const index = newData.findIndex(
                  (marker) => marker.id === e.target?.options?.id,
                );
                newData[index].isEditing = true;
                return newData;
              });
              setData(
                markers.find((item) => item.id === e.target?.options?.id),
              );
              break;

            case editorModes.POI_DELETE:
              fetch(
                "https://domki.szurag.pl/api/marker/" + e.target?.options?.id,
                {
                  method: "delete",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                },
              ).finally(() => {
                enqueueSnackbar("Usunięto POI", { variant: "success" });
                handleReloadMarkers();
              });
              break;

            case editorModes.HOUSE_EDIT:
              const house = houses.find(
                (house) => house.id === e.target?.options?.id,
              );
              setData({
                id: e.target?.options?.id,
                coordinates: e.target?.getLatLngs(),
                color: house.color,
                house: house.house,
                name: house.name,
              });
              break;

            case editorModes.HOUSE_DELETE:
              fetch(
                "https://domki.szurag.pl/api/polygon/" + e.target?.options?.id,
                {
                  method: "delete",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                },
              ).finally(() => {
                enqueueSnackbar("Usunięto domek", { variant: "success" });
                handleReloadHouses();
              });
              break;
          }
        });

        return;
      }
    });
  }, [editorMode]);

  useEffect(() => {
    const onMouseMove = (e: any) => {
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Tooltip &&
          layer.options?.className !== "transparent-tooltip" &&
          layer !== tooltip
        ) {
          map.removeLayer(layer);
        }
      });

      if (
        (!!editorModeTooltips[editorMode] ||
          lastTooltip !== editorModeTooltips[editorMode]) &&
        !data.position
      ) {
        setLastTooltip(editorModeTooltips[editorMode]);

        if (tooltip && lastTooltip === editorModeTooltips[editorMode]) {
          tooltip
            .setLatLng(e.latlng)
            .setContent(editorModeTooltips[editorMode]);
        } else {
          const newTooltip = L.tooltip({
            permanent: true,
            direction: "right",
            offset: [15, 0],
          })
            .setContent(editorModeTooltips[editorMode])
            .setLatLng(e.latlng)
            .addTo(map);
          setTooltip(newTooltip);
        }
      } else if (tooltip) {
        setTooltip(null);
      }
    };

    map.on("mousemove", onMouseMove);

    return () => {
      map.off("mousemove", onMouseMove);
      if (tooltip) {
        map.removeLayer(tooltip);
      }
    };
  }, [map, tooltip, editorMode, data]);

  return (
    <>
      {(editorMode === editorModes.POI_CREATE ||
        editorMode === editorModes.POI_EDIT) && (
        <Poi
          data={data}
          handleReset={() => setData({})}
          handleReload={handleReloadMarkers}
        />
      )}
      {(editorMode === editorModes.HOUSE_CREATE ||
        editorMode === editorModes.HOUSE_EDIT) && (
        <House
          data={data}
          handleReset={() => setData({})}
          handleReload={handleReloadHouses}
        />
      )}
    </>
  );
}
