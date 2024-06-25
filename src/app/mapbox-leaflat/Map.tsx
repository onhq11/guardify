"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-path-transform";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "@/app/mapbox-leaflet/Components/smoothScroll";
import MapEditor from "@/app/mapbox-leaflat/MapEditor";

export default function (props: any) {
  const { position, zoom } = props;

  // const icon = new L.Icon({
  //   iconUrl: "https://get.onhq.pl/f/favicon-32x32.png",
  //   iconSize: new L.Point(30, 30),
  //   iconAnchor: [15, 0],
  // });

  return (
    <>
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
        <MapEditor />
      </MapContainer>
    </>
  );
}
