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
    name_code: "vietnam",
    iso_code: "VNM",
    center: {
      latitude: 14.0583,
      longitude: 108.2772,
    },
  },
  {
    ico: <Svglao />,
    name: "Lao",
    name_code: "laos",
    iso_code: "LM",
    center: {
      latitude: 19.8563,
      longitude: 102.4955,
    },
  },
  {
    ico: <SvgMyanmar />,
    name: "Myanmar",
    name_code: "myanmar",
    iso_code: "MMR",
    center: {
      latitude: 21.9162,
      longitude: 95.956,
    },
  },
  {
    ico: <SvgNepal />,
    name: "Nepal",
    name_code: "nepal",
    iso_code: "NPL",
    center: {
      latitude: 28.3949,
      longitude: 84.124,
    },
  },
  {
    ico: <SvgAfghanistan />,
    name: "Afghanistan",
    name_code: "afghanistan",
    iso_code: "AFG",
    center: {
      latitude: 33.9391,
      longitude: 67.71,
    },
  },
  {
    ico: <SvgPakistan />,
    name: "Pakistan",
    name_code: "pakistan",
    iso_code: "PAK",
    center: {
      latitude: 30.3753,
      longitude: 69.3451,
    },
  },
];

export const MIN_ZOOM_LAYOUT = 4;
export const MIN_ZOOM_LAYOUT_DATA = 8;
export const MAX_ZOOM_LAYOUT_DATA = 16;
export const MIN_ZOOM_HEADMAP=4;
export const MAX_ZOOM_HEADMAP=MIN_ZOOM_LAYOUT_DATA+0.1;



export const AMENITIES = {
  hospital: "hospital.svg",
  clinic: "clinic.svg",
  dentist: "dentist.svg",
  pharmacy: "pharmacy.svg",
  doctors: "doctors.svg",
  nursing_home: "nursing_home.svg",
  parking: "parking.svg",
  fuel: "fuel.svg",
  bus_station: "bus_station.svg",
  bicycle_parking: "bicycle_parking.svg",
  ferry_terminal: "ferry_terminal.svg",
  taxi: "taxi.svg",
  charging_station: "charging_station.svg",
  car_rental: "car_rental.svg",
  school: "school.svg",
  university: "university.svg",
  library: "library.svg",
  kindergarten: "kindergarten.svg",
  college: "college.svg",
  public_bookcase: "public_bookcase.svg",
  parking_entrance: "parking_entrance.svg",
  bicycle_rental: "bicycle_rental.svg",
  language_school: "language_school.svg",
};
