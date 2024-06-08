import Svglao from "../assets/flags/lao.jsx";
import SvgVietnam from "../assets/flags/vietnam.jsx";
import SvgMyanmar from "../assets/flags/myanmar.jsx";
import SvgNepal from "../assets/flags/nepal.jsx";
import SvgAfghanistan from "../assets/flags/afghanistan.jsx";
import SvgPakistan from "../assets/flags/pakistan.jsx";

export const COUNTRIES = [
  {
    ico: <SvgVietnam />,
    name: "Viet Nam",
    name_code:'vietnam',
    iso_code: "VNM",
    center: {
      latitude: 14.0583,
      longitude: 108.2772,
    },
  },
  {
    ico: <Svglao />,
    name: "Lao",
    name_code:'laos',
    iso_code: "LM",
    center: {
      latitude: 19.8563,
      longitude: 102.4955,
    },
  },
  {
    ico: <SvgMyanmar />,
    name: "Myanmar",
    name_code:'myanmar',
    iso_code: "MMR",
    center: {
      latitude: 21.9162,
      longitude: 95.956,
    },
  },
  {
    ico: <SvgNepal />,
    name: "Nepal",
    name_code:'nepal',
    iso_code: "NPL",
    center: {
      latitude: 28.3949,
      longitude: 84.124,
    },
  },
  {
    ico: <SvgAfghanistan />,
    name: "Afghanistan",
    name_code:'afghanistan',
    iso_code: "AFG",
    center: {
      latitude: 33.9391,
      longitude: 67.71,
    },
  },
  {
    ico: <SvgPakistan />,
    name: "Pakistan",
    name_code:'pakistan',
    iso_code: "PAK",
    center: {
      latitude: 30.3753,
      longitude: 69.3451,
    },
  },
];

export const MIN_ZOOM_LAYOUT=4;