import { Dispatch, SetStateAction, useEffect, useState } from "react";
import L from "leaflet";
import {
  EditorModes,
  iconOptions,
  polygonTooltipOptions,
} from "@/app/mapbox-leaflet/consts";
import { Marker, Popup, useMap } from "react-leaflet";
import Editor from "@/app/mapbox-leaflet/Modes/Editor/Editor";
import Viewer from "@/app/mapbox-leaflet/Modes/Viewer/Viewer";

interface Props {
  setActivePolygonData: Dispatch<SetStateAction<any>>;
  isEditor: boolean;
  editorMode: EditorModes;
  handleReloadHouses: () => void;
  handleReloadMarkers: () => void;
  markers: Array<any>;
  setMarkers: Dispatch<SetStateAction<any>>;
  houses: Array<any>;
  modalData: any;
  setModalData: Dispatch<SetStateAction<any>>;
  activePolygonData: any;
}

export default function MapOverlay({
  setActivePolygonData,
  isEditor,
  editorMode,
  handleReloadHouses,
  handleReloadMarkers,
  markers,
  setMarkers,
  houses,
  modalData,
  setModalData,
  activePolygonData,
}: Props) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    if (houses?.length <= 0) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    houses.map((item: any) => {
      L.featureGroup().addTo(map);
      const poly = L.polygon(
        item.coordinates?.map((item: any) => [item.lat, item.lng]),
        {
          color: item.color,
          fillOpacity: 0.8,
          // @ts-ignore
          transform: true,
          id: item.id,
        },
      ).addTo(map);

      poly.on("click", () => {
        setActivePolygonData(item);
      });

      const tooltip = poly.bindTooltip(item.name, polygonTooltipOptions);
      const updateTooltipSize = () => {
        const zoomLevel = map.getZoom();
        const scale = Math.pow(2, zoomLevel - zoom - 3);
        const newContent = `<div style="transform: scale(${scale});">${item.name}</div>`;
        tooltip.getTooltip()?.setContent(newContent);
      };

      poly.on("dragstart", (e) => {
        e.target.unbindTooltip();
      });

      poly.on("dragend", (e) => {
        e.target
          .bindTooltip(item.name, polygonTooltipOptions)
          .openTooltip(e.target.getCenter());
        updateTooltipSize();
      });

      poly.on("scalestart", (e) => {
        e.target.unbindTooltip();
      });

      poly.on("scaleend", (e) => {
        e.target
          .bindTooltip(item.name, polygonTooltipOptions)
          .openTooltip(e.target.getCenter());
        updateTooltipSize();
      });

      map.addLayer(poly);

      // map.off("zoomend", updateTooltipSize);

      // updateTooltipSize();
      // map.on("zoomend", updateTooltipSize);
    });

    // const handleZoomEnd = () => {
    //   setZoom(map.getZoom());
    // };
    //
    // map.on("zoomend", handleZoomEnd);
    //
    // return () => {
    //   map.off("zoomend", handleZoomEnd);
    // };
  }, [houses]);

  return (
    <>
      {isEditor ? (
        <Editor
          editorMode={editorMode}
          handleReloadHouses={handleReloadHouses}
          handleReloadMarkers={handleReloadMarkers}
          markers={markers}
          setMarkers={setMarkers}
          houses={houses}
        />
      ) : (
        <Viewer
          modalData={modalData}
          setModalData={setModalData}
          activePolygonData={activePolygonData}
          setActivePolygonData={setActivePolygonData}
        />
      )}
      {markers.map(
        ({ coordinates, name, icon, color, id, isEditing }: any, index) => {
          let svgString = iconOptions.find((item) => item.value === icon)?.svg;
          if (!svgString || isEditing) return;

          svgString = svgString.replace(
            /fill="currentColor+"/g,
            `fill="${color}"`,
          );

          const iconSvg = L.icon({
            iconUrl: "data:image/svg+xml;base64," + btoa(svgString),
            iconSize: [30, 30],
          });

          return (
            <Marker
              key={index}
              icon={iconSvg}
              position={coordinates[0]}
              // @ts-ignore
              id={id}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup>{name}</Popup>
            </Marker>
          );
        },
      )}
    </>
  );
}
