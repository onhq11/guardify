import { LatLngExpression } from "leaflet";
import { editorModes, EditorModes } from "@/app/mapbox-leaflet/consts";

export const parseData = (data: Array<any>) => {
  return data.flatMap((item: any) => {
    return item.polygons?.map((polygon: any) => {
      return {
        ...polygon,
        house: item,
      };
    });
  });
};

export const centroid = (
  data: Array<any>,
  offset: [number, number] = [0, 0],
): LatLngExpression => {
  let xSum = 0;
  let ySum = 0;
  let n = data.length;

  data.forEach((coord) => {
    xSum += coord[0];
    ySum += coord[1];
  });

  return [xSum / n - offset[0], ySum / n - offset[1]];
};

export const extractCoordinates = (
  data: Array<any>,
): Array<Array<LatLngExpression>> => {
  return data.map((item: any) => {
    return Object.values(item);
  });
};

export const packCoordinates = (data: Array<any>) => {
  return data.map((item: any) => {
    return {
      lat: item[0],
      lng: item[1],
    };
  });
};

export const isPoi = (data: EditorModes) => {
  return (
    data === editorModes.POI_CREATE ||
    data === editorModes.POI_EDIT ||
    data === editorModes.POI_DELETE
  );
};

export const isHouse = (data: EditorModes) => {
  return (
    data === editorModes.HOUSE_CREATE ||
    data === editorModes.HOUSE_EDIT ||
    data === editorModes.HOUSE_DELETE
  );
};

export const isIdle = (data: EditorModes) => {
  return data === editorModes.IDLE;
};
