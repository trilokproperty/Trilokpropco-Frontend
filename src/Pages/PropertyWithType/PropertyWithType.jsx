import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithType = () => {
    const { name } = useParams();  // Extract the name from the URL
    const [typeId, setTypeId] = useState(null);  // State for storing the type ID
    const [properties, setProperties] = useState([]);
    const [type, setType] = useState(null);  // State for storing the type details
console.log(name, typeId)
    useEffect(() => {
        // Fetch all types from your API
        const fetchTypes = async () => {
            try {
                const response = await fetch(`${endPoint}/type`);
                const types = await response.json();  // Assuming your API returns a list of types

                console.log("Fetched types:", types);  // Debugging: Log fetched types

                // Find the type by name
                const foundType = types.find(type => type.name?.toLowerCase() === name?.replace(/_/g, " ")?.toLowerCase());

                console.log("Found type:", foundType);  // Debugging: Log found type

                // Set the type ID if the type is found
                if (foundType) {
                    setTypeId(foundType._id);  // Assuming the type object has an '_id' field for the type ID
                    setType(foundType);  // Store the found type
                } else {
                    console.log('Type not found');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchTypes();
    }, [name]);  // Run the effect when the "name" from the URL changes

    // Fetch properties and type details once we have the typeId
    useEffect(() => {
        if (typeId) {
            console.log("Fetching properties for typeId:", typeId);  // Debugging: Log typeId before fetching

            // Fetch properties by typeId
            const fetchProperties = async () => {
                try {
                    const response = await fetch(`${endPoint}/property/type/${typeId}`);
                    const data = await response.json();
                    console.log("Fetched properties:", data);  // Debugging: Log fetched properties
                    setProperties(data);  // Store the fetched properties
                } catch (error) {
                    console.error('Error fetching properties:', error);
                }
            };

            fetchProperties();

            // Fetch type details by typeId
            const fetchType = async () => {
                try {
                    const response = await fetch(`${endPoint}/type/${typeId}`);
                    const data = await response.json();
                    console.log("Fetched type details:", data);  // Debugging: Log fetched type details
                    setType(data);  // Store the type details
                } catch (error) {
                    console.error('Error fetching type details:', error);
                }
            };

            fetchType();
        }
    }, [typeId]);  // Only run this effect when typeId is available

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
                    <title>{`Properties Type: ${type?.name} - Trilokpropco`}</title>
                </Helmet>
                <SectionTitle value={`Explore Properties Type: ${type?.name}`} color="white" />
            </div> 
            <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 mt-10 pb-10 md:pb-20 md:mt-20 items-start md:mx-10 mx-5'>
                {properties?.map(property => (
                    <PropertyListCard key={property?._id} property={property} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default PropertyWithType;
