import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapy",
};

export default function () {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/mapbox-leaflet/Map"), {
        loading: () => <p>Loading....</p>,
        ssr: false,
      }),
    [],
  );

  return <Map position={[44.536507219921845, 14.447002775822495]} zoom={17} />;
}
