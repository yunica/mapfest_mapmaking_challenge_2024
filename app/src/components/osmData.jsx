const osmData = ({ osmInfo }) => {
  if (!osmInfo) return null;
  const { properties } = osmInfo;

  return (
    <div className="pt-1 mt-2 text-xs border-t">
      <p>
        <span className="mr-1 font-normal">Amenity:</span>
        <span className="font-bold">{properties.amenity} </span>
      </p>
      <p>
        <span className="mr-1 font-normal">Name:</span>
        <span className="font-bold">{properties.name || ' -- '} </span>
      </p>
      <p>
        <span className="mr-1 font-normal">OSM ID:</span>
        <span className="font-normal">
          <a
            href={`https://www.openstreetmap.org/${properties.id}`}
            rel="noreferrer"
            target="_blank"
            className="text-blue-400 underline hover:no-underline"
          >
            {properties.id}
          </a>
        </span>
      </p>
    </div>
  );
};

export default osmData;
