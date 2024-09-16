import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithLocation = () => {
    const {locationId} = useParams();
    console.log(locationId)
    const [properties, setProperties] = useState();
    const [city, setCity] = useState();
    useEffect(()=>{
        const fetchProperty = async()=>{
        const response = await await fetch(`${endPoint}/property/location/${locationId}`);
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