"use client";

import { EditControl } from "react-leaflet-draw";
import {
  FeatureGroup,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { createElement, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Flex from "@/components/Layout/Flex";
import { TwitterPicker } from "react-color";
import "./map.css";
import IconButton from "@/components/Layout/IconButton";
import {
  PiFireExtinguisher,
  PiPencil,
  PiTennisBall,
  PiTrash,
  PiWrench,
} from "react-icons/pi";
import L, { polygon } from "leaflet";
import { FaParking, FaShower } from "react-icons/fa";
import { MdOutlineFireHydrantAlt } from "react-icons/md";
import { CiIceCream, CiPizza } from "react-icons/ci";

export default function MapEditor() {
  const featureGroupRef = useRef(null);
  const defaultPolygonOptions = {
    shapeOptions: {
      color: "#3388ff", // Default color in hex
      fillOpacity: 0.4,
    },
  };
  const [color, setColor] = useState<any>({});
  const [label, setLabel] = useState<string>("");
  const [currentPolygon, setCurrentPolygon] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isMarkerOpen, setIsMarkerOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("");
  const [drawerMode, setDrawerMode] = useState("create");
  const [tooltip, setTooltip] = useState<any>(null);
  const [tooltipContent, setTooltipContent] = useState<any>("");
  const [tooltipState, setTooltipState] = useState<any>(false);
  const [markers, setMarkers] = useState<Array<any>>([]);
  const [markerIcon, setMarkerIcon] = useState<any>("parking");
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState<
    Array<any>
  >([]);
  const [currentId, setCurrentId] = useState("");
  const [editingPolygon, setEditingPolygon] = useState<any>(null);
  const [created, setCreated] = useState(false);
  const mapEvents = useMapEvents({
    click: (event) => {
      if (currentMode !== "poi" || drawerMode !== "create" || isMarkerOpen)
        return;
      setIsMarkerOpen(true);
      setCurrentId(Math.random().toString(36).substring(2, 9));
      setCurrentMarkerPosition([event.latlng.lat, event.latlng.lng]);
    },
  });

  const map = useMap();

  const onCreated = (e: any) => {
    setCurrentPolygon(e.layer);
    setIsEditorOpen(true);
    setEditingPolygon(false);

    setTimeout(() => {
      if (e.layer && e.layer.transform) {
        e.layer.transform.enable({
          rotation: true,
          scaling: false,
        });
      }
    }, 0);

    e.layer.on("click", () => {
      if (currentMode === "poi") return;

      setEditingPolygon(true);
      setCurrentPolygon(e.layer);
      setLabel(e.layer.getTooltip()?.getContent() || "");
      setIsEditorOpen(true);
    });
  };

  useEffect(() => {
    fetch("https://domki.szurag.pl/api/polygon")
      .then((response) => response.json())
      .then((data) => {
        data.map((item: any) => {
          const poly = polygon(
            item.coordinates?.map((item: any) => [item.lat, item.lng]),
            {
              color: item.color,
              fillOpacity: 1,
            },
          );
          // poly.on("click", () => {
          //   if (currentMode === "poi") return;
          //
          //   setEditingPolygon(true);
          //   setCurrentPolygon(poly);
          //   setLabel(poly.getTooltip()?.getContent() || "");
          //   setIsEditorOpen(true);
          // });
          // poly.transform.enable({ rotation: true, scaling: true });
          poly.addTo(featureGroupRef.current);
        });
      });
  }, []);

  const handleReset = () => {
    applyOpacity(currentPolygon, 1);
    setLabel("");
    setColor({});
    setIsMarkerOpen(false);
    setIsEditorOpen(false);
    setCurrentPolygon(null);
    setMarkerIcon("parking");
    setCurrentMarkerPosition([]);
    setCurrentId("");
    setEditingPolygon(false);
  };

  const applyColor = (color: string) => {
    if (currentPolygon && color) {
      currentPolygon.setStyle({
        color: color,
        fillOpacity: isEditorOpen ? 0.2 : 1,
      });
    }
  };

  const applyLabel = (label: string) => {
    if (currentPolygon) {
      currentPolygon.bindTooltip(label || "", {
        permanent: true,
        direction: "center",
        className: "transparent-tooltip",
      });
    }
  };

  const applyOpacity = (polygon: any, opacity: number) => {
    if (polygon) {
      polygon.setStyle({
        fillOpacity: opacity,
      });
    }
  };

  useEffect(() => {
    applyColor(color.hex);
  }, [color]);

  useEffect(() => {
    applyOpacity(currentPolygon, isEditorOpen ? 0.4 : 1);
  }, [currentPolygon]);

  useEffect(() => {
    applyLabel(label);
  }, [label]);

  useEffect(() => {
    if (currentMode === "poi" && drawerMode === "create") {
      setIsMarkerOpen(false);
      setTooltipState(true);
      setTooltipContent("Kliknij na mapie, aby dodać POI");
    }
    // else if (currentMode === "poi" && drawerMode === "edit") {
    //   setIsMarkerOpen(false);
    //   setTooltipState(true);
    //   setTooltipContent("Kliknij na POI, aby edytować");
    // } else if (currentMode === "poi" && drawerMode === "delete") {
    //   setIsMarkerOpen(false);
    //   setTooltipState(true);
    //   setTooltipContent("Kliknij na POI, aby usunąć");
    // }
    else {
      setIsMarkerOpen(false);
      setTooltipState(false);
      setTooltipContent("");
    }
  }, [drawerMode, currentMode]);

  const onCancel = () => {
    if (currentPolygon && !editingPolygon) {
      map.removeLayer(currentPolygon);
    }
    handleReset();
  };

  useEffect(() => {
    console.log(tooltipState, !isMarkerOpen, !isEditorOpen);
    const onMouseMove = (e: any) => {
      if (tooltipState && !isMarkerOpen && !isEditorOpen) {
        if (tooltip) {
          tooltip.setLatLng(e.latlng).setContent(tooltipContent);
        } else {
          const newTooltip = L.tooltip({
            permanent: true,
            direction: "right",
            offset: [15, 0],
          })
            .setContent(tooltipContent)
            .setLatLng(e.latlng)
            .addTo(map);
          setTooltip(newTooltip);
        }
      } else if (tooltip) {
        map.removeLayer(tooltip);
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
  }, [map, tooltip, tooltipState, isEditorOpen, isMarkerOpen]);

  const iconOptions = [
    {
      value: "parking",
      label: "Parking",
      icon: FaParking,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM240 320h-48v48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h96c52.9 0 96 43.1 96 96s-43.1 96-96 96zm0-128h-48v64h48c17.6 0 32-14.4 32-32s-14.4-32-32-32z"></path></svg>',
    },
    {
      value: "shower",
      label: "Prysznic",
      icon: FaShower,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M304,320a16,16,0,1,0,16,16A16,16,0,0,0,304,320Zm32-96a16,16,0,1,0,16,16A16,16,0,0,0,336,224Zm32,64a16,16,0,1,0-16-16A16,16,0,0,0,368,288Zm-32,32a16,16,0,1,0-16-16A16,16,0,0,0,336,320Zm-32-64a16,16,0,1,0,16,16A16,16,0,0,0,304,256Zm128-32a16,16,0,1,0-16-16A16,16,0,0,0,432,224Zm-48,16a16,16,0,1,0,16-16A16,16,0,0,0,384,240Zm-16-48a16,16,0,1,0,16,16A16,16,0,0,0,368,192Zm96,32a16,16,0,1,0,16,16A16,16,0,0,0,464,224Zm32-32a16,16,0,1,0,16,16A16,16,0,0,0,496,192Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,432,256Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,400,288Zm-64,64a16,16,0,1,0,16,16A16,16,0,0,0,336,352Zm-32,32a16,16,0,1,0,16,16A16,16,0,0,0,304,384Zm64-64a16,16,0,1,0,16,16A16,16,0,0,0,368,320Zm21.65-218.35-11.3-11.31a16,16,0,0,0-22.63,0L350.05,96A111.19,111.19,0,0,0,272,64c-19.24,0-37.08,5.3-52.9,13.85l-10-10A121.72,121.72,0,0,0,123.44,32C55.49,31.5,0,92.91,0,160.85V464a16,16,0,0,0,16,16H48a16,16,0,0,0,16-16V158.4c0-30.15,21-58.2,51-61.93a58.38,58.38,0,0,1,48.93,16.67l10,10C165.3,138.92,160,156.76,160,176a111.23,111.23,0,0,0,32,78.05l-5.66,5.67a16,16,0,0,0,0,22.62l11.3,11.31a16,16,0,0,0,22.63,0L389.65,124.28A16,16,0,0,0,389.65,101.65Z"></path></svg>',
    },
    {
      value: "hydrant",
      label: "Hydrant",
      icon: MdOutlineFireHydrantAlt,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 10.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M19 11h-1V8h2V6h-2.35a5.99 5.99 0 0 0-11.3 0H4v2h2v3H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v3H4v2h16v-2h-2v-3h1c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm-7-7c1.47 0 2.75.81 3.44 2H8.56c.69-1.19 1.97-2 3.44-2zm7 11h-3v5H8v-5H5v-2h3V8h8v5h3v2z"></path></svg>',
    },
    {
      value: "extinguisher",
      label: "Gaśnica",
      icon: PiFireExtinguisher,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M218.3,48.34l-60.68-18.2,30-15A8,8,0,0,0,180.42.85L134,24.05a80.08,80.08,0,0,0-78,80V208a8,8,0,0,0,16,0V176H88v56a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16V104a48.07,48.07,0,0,0-40-47.32V42.75l69.7,20.91a8,8,0,1,0,4.6-15.32ZM72,160V104a64.07,64.07,0,0,1,56-63.48V56.68A48.07,48.07,0,0,0,88,104v56Zm96,72H104V176h64v56Zm0-128v56H104V104a32,32,0,0,1,64,0Z"></path></svg>',
    },
    {
      value: "tennis",
      label: "Tenis",
      icon: PiTennisBall,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M201.57,54.46a104,104,0,1,0,0,147.08A103.4,103.4,0,0,0,201.57,54.46ZM65.75,65.77a87.63,87.63,0,0,1,53.66-25.31A87.31,87.31,0,0,1,94,94.06a87.42,87.42,0,0,1-53.62,25.35A87.58,87.58,0,0,1,65.75,65.77ZM40.33,135.48a103.29,103.29,0,0,0,65-30.11,103.24,103.24,0,0,0,30.13-65,87.78,87.78,0,0,1,80.18,80.14,104,104,0,0,0-95.16,95.1,87.78,87.78,0,0,1-80.18-80.14Zm149.92,54.75a87.69,87.69,0,0,1-53.66,25.31,88,88,0,0,1,79-78.95A87.58,87.58,0,0,1,190.25,190.23Z"></path></svg>',
    },
    {
      value: "icecreams",
      label: "Lodziarnia",
      icon: CiIceCream,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Ice_Cream"><path d="M16.54,5.94a4.594,4.594,0,0,0-9.08,0,3.065,3.065,0,0,0-.76,5.85l3.92,9.25a1.5,1.5,0,0,0,2.76,0l3.92-9.26a3.058,3.058,0,0,0-.76-5.84ZM12.46,20.65a.5.5,0,0,1-.92,0L7.89,12.03h8.22Zm3.64-9.62H7.9a2.06,2.06,0,1,1,.01-4.12.5.5,0,0,0,.5-.48,3.6,3.6,0,0,1,7.18,0,.506.506,0,0,0,.51.48,2.06,2.06,0,0,1,0,4.12Z"></path></g></svg>',
    },
    {
      value: "pizza",
      label: "Restauracja",
      icon: CiPizza,
      svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Pizza"><g><path d="M20.807,13.437l-.01-.04a19.05,19.05,0,0,0-10.23-10.21,1.574,1.574,0,0,0-2.08.93l-5.32,14.69a1.58,1.58,0,0,0,1.48,2.12,1.654,1.654,0,0,0,.54-.09l14.7-5.32a1.585,1.585,0,0,0,.91-.85A1.547,1.547,0,0,0,20.807,13.437Zm-6.98,2.98a1,1,0,0,0,.2.16L4.847,19.9a.582.582,0,0,1-.6-.14.556.556,0,0,1-.14-.61l2.39-6.6a1,1,0,0,0,.16.2,1.81,1.81,0,0,0,2.56-2.56,1.782,1.782,0,0,0-1.7-.47l1.09-2.98a17.346,17.346,0,0,1,6.82,5.57,2.447,2.447,0,0,0-1.6.71A2.4,2.4,0,0,0,13.827,16.417Zm6.05-2.15a.592.592,0,0,1-.33.31l-1.32.47c-.11-.23-.22-.45-.33-.67-.12-.24-.25-.48-.38-.71-.31-.55-.65-1.08-1-1.58a18.655,18.655,0,0,0-7.57-6.3l.48-1.33a.561.561,0,0,1,.31-.33.456.456,0,0,1,.23-.05.793.793,0,0,1,.25.05,18.013,18.013,0,0,1,9.67,9.68v.02A.561.561,0,0,1,19.877,14.267Z"></path><circle cx="7.835" cy="16.489" r="1.075"></circle></g></g></svg>',
    },
  ];

  return (
    <>
      {/*<Paper*/}
      {/*  sx={{*/}
      {/*    position: "absolute",*/}
      {/*    left: "50%",*/}
      {/*    top: "2%",*/}
      {/*    transform: "translateX(-50%)",*/}
      {/*    zIndex: 10000,*/}
      {/*    backgroundColor: "white",*/}
      {/*    color: "#333",*/}
      {/*    borderRadius: "9px",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Flex>*/}
      {/*    <Button*/}
      {/*      onClick={() => {*/}
      {/*        if (currentMode === "poi") {*/}
      {/*          setCurrentMode("");*/}
      {/*          return;*/}
      {/*        }*/}

      {/*        setCurrentMode("poi");*/}
      {/*      }}*/}
      {/*      color={currentMode === "poi" ? "secondary" : "primary"}*/}
      {/*    >*/}
      {/*      Dodaj POI*/}
      {/*    </Button>*/}
      {/*    <Divider orientation="vertical" flexItem />*/}
      {/*    <Button>Dodaj domek</Button>*/}
      {/*  </Flex>*/}
      {/*</Paper>*/}
      {currentMode === "poi" && (
        <Flex
          sx={{
            position: "absolute",
            left: "50%",
            top: "7%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            gap: 1,
            color: "#333",
            borderRadius: "9px",
          }}
        >
          <Box
            sx={{
              backgroundColor: drawerMode === "create" ? "#ddd" : "white",
              borderRadius: "9px",
            }}
          >
            <IconButton
              onClick={() => setDrawerMode("create")}
              sx={{ p: 0.5, borderRadius: "9px" }}
            >
              <PiPencil size={20} />
            </IconButton>
          </Box>
          <Box
            sx={{
              backgroundColor: drawerMode === "edit" ? "#ddd" : "white",
              borderRadius: "9px",
            }}
          >
            <IconButton
              onClick={() => setDrawerMode("edit")}
              sx={{ p: 0.5, borderRadius: "9px" }}
            >
              <PiWrench size={20} />
            </IconButton>
          </Box>
          <Box
            sx={{
              backgroundColor: drawerMode === "delete" ? "#ddd" : "white",
              borderRadius: "9px",
            }}
          >
            <IconButton
              onClick={() => setDrawerMode("delete")}
              color="error"
              sx={{ p: 0.5, borderRadius: "9px" }}
            >
              <PiTrash size={20} />
            </IconButton>
          </Box>
        </Flex>
      )}
      {isEditorOpen && (
        <Paper
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            backgroundColor: "white",
            color: "#333",
            p: 2,
            borderRadius: "9px",
            minWidth: "300px",
          }}
        >
          <Typography>{editingPolygon ? "Edytuj" : "Dodaj"} pole</Typography>
          <TextField
            sx={{ mt: 2 }}
            size="small"
            label="Nazwa"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            fullWidth
          />
          <Flex sx={{ my: 2 }}>
            <TwitterPicker
              color={color}
              onChange={(color) => setColor(color)}
              triangle="hide"
            />
          </Flex>
          <Flex end sx={{ gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onCancel}
            >
              Anuluj
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleReset}
            >
              Zapisz
            </Button>
          </Flex>
        </Paper>
      )}
      {isMarkerOpen && (
        <Paper
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "5%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            backgroundColor: "white",
            color: "#333",
            p: 2,
            borderRadius: "9px",
            minWidth: "300px",
          }}
        >
          <Typography>
            {drawerMode === "edit" ? "Edytuj" : "Dodaj"} POI
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            size="small"
            label="Nazwa"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            fullWidth
          />
          <Flex sx={{ my: 2 }}>
            <RadioGroup
              row
              value={markerIcon}
              onChange={(event) => {
                setMarkerIcon(event.target.value);
              }}
            >
              {iconOptions.length > 0 &&
                iconOptions.map(
                  (item: any, itemIndex: number) =>
                    !!item?.value && (
                      // @ts-ignore
                      <FormControlLabel
                        key={itemIndex}
                        sx={{ m: 0.75 }}
                        value={item.value}
                        control={
                          <Radio
                            sx={{ p: 0 }}
                            icon={
                              <Paper
                                sx={{
                                  p: 1,
                                  bgcolor: "#fff",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {!!item.icon &&
                                  createElement(item.icon, { size: 30 })}
                                {item.label}
                              </Paper>
                            }
                            checkedIcon={
                              <Paper
                                sx={{
                                  p: 1,
                                  bgcolor: "#669edf",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {!!item.icon &&
                                  createElement(item.icon, { size: 30 })}
                                {item.label}
                              </Paper>
                            }
                          />
                        }
                      />
                    ),
                )}
            </RadioGroup>
          </Flex>
          <Flex sx={{ my: 2 }}>
            <TwitterPicker
              color={color}
              onChange={(color) => setColor(color)}
              triangle="hide"
              width="100%"
            />
          </Flex>
          <Flex center sx={{ mt: 4 }}>
            <Flex
              column
              alignCenter
              sx={{
                gap: 1,
                border: "1px solid #c4c4c4",
                p: 1,
                borderRadius: "9px",
                ...(!!color?.hex && { color: color.hex }),
              }}
            >
              <Typography sx={{ color: "#000" }}>Podgląd</Typography>
              {createElement(
                // @ts-ignore
                iconOptions?.find((item) => item.value === markerIcon)?.icon,
                { size: 30 },
              )}
            </Flex>
          </Flex>
          <Flex end sx={{ gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleReset}
            >
              Anuluj
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                const marker = markers.find(
                  (marker: any) => marker.id === currentId,
                );

                if (marker) {
                  setMarkers([
                    ...markers.filter((item) => item.id !== currentId),
                    {
                      position: currentMarkerPosition,
                      name: label,
                      color: color.hex,
                      icon: markerIcon,
                      id: currentId,
                    },
                  ]);
                  handleReset();
                  return;
                }
                setMarkers([
                  ...markers,
                  {
                    position: currentMarkerPosition,
                    name: label,
                    color: color.hex,
                    icon: markerIcon,
                    id: currentId,
                  },
                ]);

                handleReset();
              }}
            >
              Zapisz
            </Button>
          </Flex>
        </Paper>
      )}
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            polygon: defaultPolygonOptions,
            polyline: false,
            circle: false,
            rectangle: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
      {markers.map(({ position, name, icon, color, id }: any, index) => {
        let svgString = iconOptions.find((item) => item.value === icon)?.svg;
        // @ts-ignore
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
            draggable
            icon={iconSvg}
            position={position}
            eventHandlers={{
              click: () => {
                if (drawerMode === "edit" && currentMode === "poi") {
                  setLabel(name);
                  setColor({ hex: color });
                  setCurrentMarkerPosition(position);
                  setMarkerIcon(icon);
                  setIsMarkerOpen(true);
                  setCurrentId(id);
                }

                if (drawerMode === "delete" && currentMode === "poi") {
                  setMarkers(markers.filter((marker: any) => marker.id !== id));
                }
              },
              moveend: (event) => {
                setMarkers((item: any) => {
                  const index = item.findIndex(
                    (marker: any) => marker.id === id,
                  );
                  const newData = [...item];
                  newData[index].position = [
                    event.target._latlng.lat,
                    event.target._latlng.lng,
                  ];
                  return newData;
                });
              },
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
      })}
    </>
  );
}
