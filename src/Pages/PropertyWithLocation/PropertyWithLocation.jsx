import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithLocation = () => {
    const {name} = useParams();
    const [cityId, setCityId] = useState(null)
    console.log(cityId, name)
    const [properties, setProperties] = useState();
    const [city, setCity] = useState();
    useEffect(()=>{
        // Fetch all cities from your API
    const fetchCities = async () => {
      try {
        const response = await fetch(`${endPoint}/city`);
        const cities = await response.json(); // Assuming your API returns a list of cities

        // Find the city by name
        const city = cities.find(city => city.name.toLowerCase() === name.toLowerCase());

        // Set the city ID if the city is found
        if (city) {
          setCityId(city._id); // Assuming the city object has an '_id' field for the city ID
        } else {
          console.log('City not found');
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
        const fetchProperty = async()=>{
        const response = await await fetch(`${endPoint}/property/location/${cityId}`);
        const data = await response.json();
        setProperties(data)
        }
        fetchProperty()
        const fetchCity = async()=>{
            const response = await await fetch(`${endPoint}/city/${locationId}`);
            const data = await response.json();
            setCity(data)
            }
            fetchCity()
    },[locationId])
    return (
    <div>
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
