import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function () {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/mapbox-leaflat/Map"), {
        loading: () => <p>Loading....</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <div>
      <Map position={[44.536507219921845, 14.447002775822495]} zoom={17} />
    </div>
  );
}
