import { Popup } from 'react-map-gl';
import { AMENITIES } from './constants';
const basename = (process.env.PUBLIC_URL || '').replace('//', '/');

const popUp = ({ hoverInfo }) => {
  if (!hoverInfo) return null;
  if (!hoverInfo.lngLat) return null;

  const { properties, layer, lngLat } = hoverInfo;
  const amenityIco = AMENITIES[properties.amenity];

  return (
    <Popup
      longitude={lngLat[0]}
      latitude={lngLat[1]}
      offset={[0, -10]}
      closeButton={false}
      className="county-info"
    >
      <div className="space-y-1 text-gray-700">
        {amenityIco && (
          <img
            src={`${basename}/assets/marker/${amenityIco}`}
            alt="amenity icon"
            width={20}
            className="mx-auto"
          />
        )}
        <p className="">
          <span className="mr-1 font-normal ">Amenity: </span>
          <span className="font-bold">{properties.amenity} </span>
        </p>
        <p className="">
          <span className="mr-1 font-normal ">Name:</span>
          <span className="font-bold">{properties.name} </span>
        </p>
        <p className="">
          <span className="mr-1 font-normal ">OSM ID:</span>
          <span className="font-bold">{properties.id}</span>
        </p>
        <p className="">
          <span className="mr-1 font-normal">Layer:</span>
          <span className="font-bold">{layer.id.split('-')[0]}</span>
        </p>
      </div>
    </Popup>
  );
};

export default popUp;
