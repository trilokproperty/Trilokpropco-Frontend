import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endPoint } from "../../Component/ForAll/ForAll";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import { Helmet } from "react-helmet";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import PropertyListCard from "../../Component/ForAll/PropertyListCard";

const PropertyWithType = () => {
    const {typeId} = useParams();
    console.log(typeId)
    const [properties, setProperties] = useState();
    const [type, setType] = useState();
    useEffect(()=>{
        const fetchProperty = async()=>{
        const response = await fetch(`${endPoint}/property/type/${typeId}`);
        const data = await response.json();
        setProperties(data)
        }
        fetchProperty()
        const fetchType = async()=>{
            const response = await fetch(`${endPoint}/type/${typeId}`);
            const data = await response.json();
            setType(data)
            }
            fetchType()
    },[typeId])
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
                    <title>{`Properties Type: ${type?.type} - Trilokpropco`}</title>
                </Helmet>
                <SectionTitle value={`Explore Properties Type: ${type?.type}`} color="white" />
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

export default PropertyWithType;