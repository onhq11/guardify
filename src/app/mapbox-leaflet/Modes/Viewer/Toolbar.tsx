import Houses from "@/app/mapbox-leaflet/Modes/Viewer/Modal/Houses";
import { Dispatch, SetStateAction } from "react";

interface Props {
  modalData: any;
  setModalData: Dispatch<SetStateAction<any>>;
}

export default function Toolbar({ modalData, setModalData }: Props) {
  return (
    <>
      <Houses modalData={modalData} setModalData={setModalData} />
    </>
  );
}
