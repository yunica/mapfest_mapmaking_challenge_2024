import pako from "pako";
import axios from "axios";

const basename = (process.env.PUBLIC_URL || "").replace("//", "/");

export const csv2object = (csvString) => {
  const lines = csvString.split("\n");
  const headers = lines[0].split(",");
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");
    headers.forEach((header, j) => {
      obj[header.trim()] = currentLine[j] || "";
    });
    result.push(obj);
  }

  return result;
};

export const object2feature = (listObject) => {
  return {
    type: "FeatureCollection",
    features: listObject.map((i) => ({
      type: "Feature",
      properties: {
        amenity: i.amenity,
        name: i.name,
        id: i.id,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(i.longitude), parseFloat(i.latitude)],
      },
    })),
  };
};

export const fetchLocalCsv = async ( name_code, source ) => {
  try {
    const responseSchool = await axios.get(
      `${basename}/assets/csv_file/${name_code}_${source}.csv.gz`,
      {
        responseType: "arraybuffer",
      }
    );
    const responseSchoolString = pako.inflate(responseSchool.data, {
      to: "string",
    });
    let schoolObject = object2feature(csv2object(responseSchoolString));
    return schoolObject;

  } catch (err) {
    console.error(err);
    return null;
  }

};
