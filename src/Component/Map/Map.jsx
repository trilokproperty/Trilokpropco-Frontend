import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa"; 
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server"; // To convert React icon to string

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

// Convert react-icon (FaMapMarkerAlt) to SVG using renderToStaticMarkup
const markerIconMarkup = renderToStaticMarkup(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="#046307"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-map-pin"
  >
    <path d="M21 10c0 6.075-9 12-9 12s-9-5.925-9-12a9 9 0 1118 0z" /> {/* Pin outline */}
    <circle cx="12" cy="10" r="3" /> {/* Circular center */}
  </svg>);

// Custom Leaflet icon using the rendered SVG
const customIcon = L.divIcon({
  className: "custom-marker", // Add a custom class to style the marker if needed
  html: markerIconMarkup, // Inject the SVG markup into the icon
  iconSize: [36, 36], // Size of the icon
  iconAnchor: [12, 24], // Position of the icon anchor
});

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
    const nameSlug = item?.name.replace(/\s+/g, '-');
        
        return (
          <Marker
            position={markerPosition}
            key={item._id}
            icon={customIcon} // Pass the custom icon here
          >
            <Popup>
              <div className="flex gap-2 bg-white items-center w-[280px] p-2">
                <img src={item.galleryImages[0]} alt={item.name} className="w-[60px] h-[40px]" />
                <div className="pr-2">
                  <Link className="font-semibold" to={`/${item?.category}/${nameSlug}`}>
                    {item.name}
                  </Link>
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
