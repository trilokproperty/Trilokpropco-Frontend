import { HeadProvider } from "react-head";
// import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
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
import FloatingIcons from '../../../Component/ForAll/FloatingIcons';
import SEO from "../../../hooks/SEO";

const Main = () => {
    const [metaDatas, setMetaDatas] = useState(null);

    // useEffect(() => {
    //     const fetchSEO = async () => {
    //         try {
    //             const response = await fetch(`/seohome.json`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setMetaDatas(data);
    //             }
    //         } catch (error) {
    //             console.error("SEO data not found:", error);
    //         }
    //     };

    //     fetchSEO();
    // }, []);

    return (
        // <HelmetProvider>
        <HeadProvider>

            <div className="overflow-hidden">
                <FloatingIcons />
                {/* <HeadProvider> */}
                <SEO
                    title={metaDatas?.metaTitle || "Trilok Propco | Best Real Estate Agent in Kolkata for Buying & Selling Properties"}
                    description={metaDatas?.metaDescription || "Trilok Propco, Kolkata’s Top Property Consultant, specializes in buying and selling Luxury Villas, Flats, and Commercial Properties."}
                    image={metaDatas?.FeaturedImage || "https://res.cloudinary.com/dj8r5wv5l/image/upload/v1723039344/is0bcdkervpkc0eeahkm.webp"}
                    url="https://trilokpropco.com"
                />
                {/* </HeadProvider> */}
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
         {/* </HelmetProvider> */}
                </HeadProvider>
        );
};

export default Main;
