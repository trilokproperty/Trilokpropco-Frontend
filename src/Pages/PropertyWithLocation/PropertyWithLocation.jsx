import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithLocation = () => {
  const { name } = useParams(); // Get city name from URL params
  const [cityId, setCityId] = useState(null); // To store city ID
  const [properties, setProperties] = useState([]); // To store properties
  const [city, setCity] = useState(null); // To store city details

  // Convert hyphenated name to normal space-separated name
  const formattedName = name.replace(/_/g, " ");

  // Fetch city ID based on formatted name
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${endPoint}/city`);
        const cities = await response.json(); // Fetch all cities

        // Find the city by the formatted name
        const city = cities.find(city => city.name.toLowerCase() === formattedName.toLowerCase());

        // If the city is found, set the cityId and city details
        if (city) {
          setCityId(city._id); // Assuming city has '_id' field
          setCity(city); // Save the city details
        } else {
          // console.log('City not found');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [formattedName]);

  // Fetch properties based on cityId
  useEffect(() => {
    if (cityId) { // Only fetch properties if cityId is available
      const fetchProperties = async () => {
        try {
          const response = await fetch(`${endPoint}/property/location/${cityId}`);
          const data = await response.json();
          setProperties(data); // Set the fetched properties
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      fetchProperties();
    }
  }, [cityId]); // Fetch properties when cityId changes
  
    return (
    <div>
      <FloatingIcons/>
           <div style={{
                backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} className="pt-5 lg:h-96 h-40 md:h-56">
                <Header />
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{`Properties In ${city?.name} - Trilokpropco`}</title>
                </Helmet>
                <SectionTitle value={`Explore Properties In: ${city?.name}`} color="white" />
            </div> 
            <div className=' grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 mt-10 pb-10 md:pb-20 md:mt-20  items-start md:mx-10 mx-5 '>
                    {properties?.map(property => (
                        <PropertyListCard key={property?._id} property={property} />
                    ))}
                </div>

                <Footer />
    </div>
    );
};

export default PropertyWithLocation;
