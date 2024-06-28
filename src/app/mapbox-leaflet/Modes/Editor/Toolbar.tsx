import { Button, Divider, Tooltip } from "@mui/material";
import { BsHouseAdd, BsHouseAddFill } from "react-icons/bs";
import { PiMapPinFill, PiMapPinLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { editorModes } from "@/app/mapbox-leaflet/consts";

interface Props {
  handleUpdateEditorMode: (mode: string) => void;
}

export default function Toolbar({ handleUpdateEditorMode }: Props) {
  const [poiState, setPoiState] = useState(false);
  const [houseState, setHouseState] = useState(false);

  useEffect(() => {
    if (poiState) {
      setHouseState(false);
      handleUpdateEditorMode(editorModes.POI_CREATE);
    }
  }, [poiState]);

  useEffect(() => {
    if (houseState) {
      setPoiState(false);
      handleUpdateEditorMode(editorModes.HOUSE_CREATE);
    }
  }, [houseState]);

  useEffect(() => {
    if (!poiState && !houseState) {
      handleUpdateEditorMode(editorModes.IDLE);
    }
  }, [poiState, houseState]);

  return (
    <>
      <Tooltip title={"Edycja domków"}>
        <Button onClick={() => setHouseState(!houseState)}>
          {houseState ? <BsHouseAddFill size={20} /> : <BsHouseAdd size={20} />}
        </Button>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title={"Edycja POI"}>
        <Button onClick={() => setPoiState(!poiState)}>
          {poiState ? <PiMapPinFill size={20} /> : <PiMapPinLight size={20} />}
        </Button>
      </Tooltip>
    </>
  );
}
