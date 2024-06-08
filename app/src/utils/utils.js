export const csv2object = (csvString) => {
  const lines = csvString.split("\n");
  const headers = lines[0].split(",");
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");
    headers.forEach((header, j) => {
      obj[header.trim()] = currentLine[j]||"";
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
