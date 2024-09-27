
import { Helmet } from "react-helmet";
import Footer from "../../../Component/Navigation/Footer";
import Contact from "../Home/Contact";
import ExploreCities from "../Home/ExploreCities";
import Home from "../Home/Home";
import Info from "../Home/Info";
import LatestBlogs from "../Home/LatestBlogs";
import LatestProperties from "../Home/LatestProperties";
import Partners from "../Home/Partners";
import PropertyTypes from "../Home/PropertyTypes";
import SearchBar from "../Home/SearchBar";
import Testimonial from "../Home/Testimonial";
import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";

const Main = () => {
    const [metaDatas, setMetaDatas] = useState();
    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const response = await fetch(`${endPoint}/meta`);
                const data = await response.json(); // Await the JSON parsing
                setMetaDatas(data);
            } catch (error) {
                console.error('Error fetching metadata:', error);
            }
        };
        fetchMeta();
    }, []);
    
    console.log(metaDatas);
    
    return (
        <div className="overflow-hidden">
            <Helmet>
                
    <title>Trilok Propco - Real Estate Consultant</title>
        <meta name="description" content={ metaDatas? metaDatas[0]?.metaDescription : 'Default Description'} />
        <meta name="og:title" content={ metaDatas? metaDatas[0]?.metaTitle : 'Default Title'} />
        <meta name="og:description" content={ metaDatas? metaDatas[0]?.metaDescription : 'Default Description'} />
        <meta name="og:image" content={ metaDatas? metaDatas[0]?.FeaturedImage : 'default-image-url.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ metaDatas? metaDatas[0]?.metaTitle : 'Default Title'} />
        <meta name="twitter:description" content={ metaDatas? metaDatas[0]?.metaDescription : 'Default Description'} />
        <meta name="twitter:image" content={ metaDatas? metaDatas[0]?.FeaturedImage : 'default-image-url.jpg'} />
      </Helmet>
            <Home />
            <SearchBar />
            <Partners />
            <ExploreCities />
            <PropertyTypes />
            <LatestProperties />
            <Info />
            <LatestBlogs />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    );
};

export default Main;