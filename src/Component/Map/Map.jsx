import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa"; 
import { IconContext } from "react-icons";


// Utility function to extract latitude and longitude from the URL
const getCoordinatesFromUrl = (url) => {
  const latMatch = url.match(/!3d(-?\d+\.\d+)/); // Extract latitude
  const lngMatch = url.match(/!2d(-?\d+\.\d+)/); // Extract longitude

  if (latMatch && lngMatch) {
    const latitude = parseFloat(latMatch[1]);
    const longitude = parseFloat(lngMatch[1]);
    return { latitude, longitude };
  }

  return null; // Return null if coordinates aren't found
};

const Map = ({ properties }) => {
  return (
    <MapContainer
      center={[23.4933742, 88.3990239]} // Fallback center position
      zoom={7}
      scrollWheelZoom={false}
      className="h-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties?.map((item) => {
        // Extract coordinates dynamically from the property.locationMap URL
        const coordinates = getCoordinatesFromUrl(item.locationMap);
        const markerPosition = coordinates
          ? [coordinates.latitude, coordinates.longitude]
          : [22.4933742, 88.3990239]; // Fallback to default position if no coordinates found

        return (
          <Marker
            position={markerPosition} 
            key={item._id}
          >
            <Popup>
              <div className="flex gap-2 bg-white items-center w-[280px] p-2">
                <img src={item.galleryImages[0]} alt={item.name} className="w-[60px] h-[40px]"/>
                <div className="pr-2">
                  <Link className="font-semibold" to={`/${item._id}`}>{item.name}</Link>
                  <span>
                    <b className="flex gap-1 items-start">
                      <FaRupeeSign />
                      {item.priceRange}
                    </b>
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
