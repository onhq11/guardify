"use client";

import { useMap } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";
import HousePositions from "@/app/mapbox-leaflet/Modes/Viewer/Modal/HousePositions";
import HouseDetails from "@/app/mapbox-leaflet/Modes/Viewer/Modal/HouseDetails";

interface Props {
  modalData: any;
  setModalData: Dispatch<SetStateAction<any>>;
  activePolygonData: any;
  setActivePolygonData: Dispatch<SetStateAction<any>>;
}

export default function Viewer({
  modalData,
  setModalData,
  activePolygonData,
  setActivePolygonData,
}: Props) {
  const map = useMap();

  return (
    <>
      <HousePositions data={modalData} handleClose={() => setModalData({})} />
      <HouseDetails
        data={activePolygonData}
        handleClose={() => setActivePolygonData({})}
      />
    </>
  );
}
