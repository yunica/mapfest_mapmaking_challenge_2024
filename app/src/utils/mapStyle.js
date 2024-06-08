import {
  MAX_ZOOM_LAYOUT_DATA,
  MIN_ZOOM_LAYOUT_DATA,
} from "../components/constants";
// generic
export const layoutStyleGeneral = {
  "icon-image": ["concat", ["get", "amenity"], "-icon"],
  "icon-size": [
    "interpolate",
    ["linear"],
    ["zoom"],
    MIN_ZOOM_LAYOUT_DATA,
    0.11,
    MAX_ZOOM_LAYOUT_DATA,
    0.4,
  ],
};
