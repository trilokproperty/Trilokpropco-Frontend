import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithType = () => {
  const { type } = useParams(); // Get type name from URL params
  const [typeId, setTypeId] = useState(null); // To store type ID
  const [properties, setProperties] = useState([]); // To store properties
  const [type, setType] = useState(null); // To store type details

  // Convert hyphenated name to normal space-separated name
  const formattedName = type.replace(/_/g, " ");

  // Fetch type ID based on formatted name
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(`${endPoint}/type`); // Fetch all property types
        const types = await response.json();

        // Find the type by the formatted name
        const type = types.find(type => type.type.toLowerCase() === formattedName.toLowerCase());

        // If the type is found, set the typeId and type details
        if (type) {
          setTypeId(type._id); // Assuming type has '_id' field
          setType(type); // Save the type details
        } else {
          console.log('Type not found');
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, [formattedName]);

  // Fetch properties based on typeId
  useEffect(() => {
    if (typeId) { // Only fetch properties if typeId is available
      const fetchProperties = async () => {
        try {
          const response = await fetch(`${endPoint}/property/type/${typeId}`); // Adjust this endpoint accordingly
          const data = await response.json();
          setProperties(data); // Set the fetched properties
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };

      fetchProperties();
    }
  }, [typeId]);

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
          <title>{`Properties of Type: ${type?.name} - Trilokpropco`}</title>
        </Helmet>
        <SectionTitle value={`Explore Properties of Type: ${type?.name}`} color="white" />
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
