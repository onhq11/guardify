"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "@/app/mapbox-leaflet/Components/smoothScroll";
import "@/app/mapbox-leaflet/map.css";
import "leaflet-path-transform";
import "leaflet-draw-drag";
import { useEffect, useState } from "react";
import { Button, Divider, Paper, Tooltip } from "@mui/material";
import Flex from "@/components/Layout/Flex";
import { PiEye, PiWrench } from "react-icons/pi";
import EditorToolbar from "@/app/mapbox-leaflet/Modes/Editor/Toolbar";
import ViewerToolbar from "@/app/mapbox-leaflet/Modes/Viewer/Toolbar";
import { parseData } from "@/app/mapbox-leaflet/utils";
import { editorModes, EditorModes } from "@/app/mapbox-leaflet/consts";
import SubToolbar from "@/app/mapbox-leaflet/Modes/Editor/SubToolbar/SubToolbar";
import MapOverlay from "@/app/mapbox-leaflet/MapOverlay";

interface Props {
  position: [number, number];
  zoom: number;
}

export default function Map({ position, zoom }: Props) {
  // GLOBAL
  const [houses, setHouses] = useState<Array<any>>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const [modalData, setModalData] = useState<any>({});
  const [activePolygonData, setActivePolygonData] = useState<any>({});
  const [isEditor, setIsEditor] = useState(false);
  const [reloadHouses, setReloadHouses] = useState(false);
  const [reloadMarkers, setReloadMarkers] = useState(false);

  useEffect(() => {
    fetch("https://domki.szurag.pl/api/house")
      .then((response) => response.json())
      .then((response) => {
        const parsedData = parseData(response);
        setHouses(parsedData);
      });
  }, [reloadHouses]);

  useEffect(() => {
    fetch("https://domki.szurag.pl/api/marker")
      .then((response) => response.json())
      .then((response) => {
        setMarkers(response);
      });
  }, [reloadMarkers]);

  const handleReloadHouses = () => {
    setReloadHouses(!reloadHouses);
  };

  const handleReloadMarkers = () => {
    setReloadMarkers(!reloadMarkers);
  };

  // EDITOR
  const [editorMode, setEditorMode] = useState(editorModes.IDLE);

  const handleUpdateEditorMode = (editorMode: EditorModes) => {
    setEditorMode(editorMode);
  };

  // BODY
  return (
    <>
      <Paper
        sx={{
          position: "absolute",
          top: "2vh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1200,
          backgroundColor: "white",
          borderRadius: "9px",
        }}
      >
        <Flex>
          <Tooltip title={isEditor ? "Tryb podglądu" : "Tryb edycji"}>
            <Button onClick={() => setIsEditor(!isEditor)}>
              {isEditor ? <PiEye size={20} /> : <PiWrench size={20} />}
            </Button>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
          {isEditor ? (
            <EditorToolbar handleUpdateEditorMode={handleUpdateEditorMode} />
          ) : (
            <ViewerToolbar modalData={modalData} setModalData={setModalData} />
          )}
        </Flex>
      </Paper>
      {isEditor && editorMode !== editorModes.IDLE && (
        <SubToolbar
          editorMode={editorMode}
          handleUpdateEditorMode={handleUpdateEditorMode}
        />
      )}
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: "100vh", width: "100vw" }}
        maxZoom={22}
        touchZoom={true}
        zoomControl={false}
        zoomAnimation
        scrollWheelZoom={false}
        // @ts-ignore
        smoothWheelZoom={true}
        smoothSensitivity={5}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib25ocSIsImEiOiJjbHhsbjRndnYwMXhvMmpzMnBnanVzNHhxIn0.LBA-I7SM9Qk1piAjO0vRcw"
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
          maxZoom={22}
          tileSize={512}
          zoomOffset={-1}
        />
        <MapOverlay
          setActivePolygonData={setActivePolygonData}
          isEditor={isEditor}
          editorMode={editorMode}
          handleReloadHouses={handleReloadHouses}
          handleReloadMarkers={handleReloadMarkers}
          markers={markers}
          setMarkers={setMarkers}
          houses={houses}
          modalData={modalData}
          setModalData={setModalData}
          activePolygonData={activePolygonData}
        />
      </MapContainer>
    </>
  );
}
