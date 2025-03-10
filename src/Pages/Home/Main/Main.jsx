import { Helmet, HelmetProvider } from "react-helmet-async";
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

const Main = () => {
    const [metaDatas, setMetaDatas] = useState(null);

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const response = await fetch(`/seohome.json`);
                if (response.ok) {
                    const data = await response.json();
                    setMetaDatas(data);
                }
            } catch (error) {
                console.error("SEO data not found:", error);
            }
        };

        fetchSEO();
    }, []);

    return (
        <HelmetProvider>
            <div className="overflow-hidden">
                <FloatingIcons />
                <Helmet>
                    <title>{metaDatas?.metaTitle || "Trilok Propco - Real Estate Consultant"}</title>
                    <meta name="description" content={metaDatas?.metaDescription || "Default Description"} />
                    <meta property="og:title" content={metaDatas?.metaTitle || "Default Title"} />
                    <meta property="og:description" content={metaDatas?.metaDescription || "Default Description"} />
                    <meta property="og:image" content={metaDatas?.FeaturedImage || "default-image-url.jpg"} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={metaDatas?.metaTitle || "Default Title"} />
                    <meta name="twitter:description" content={metaDatas?.metaDescription || "Default Description"} />
                    <meta name="twitter:image" content={metaDatas?.FeaturedImage || "default-image-url.jpg"} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://trilokpropco.com" />
                    <link rel="canonical" href="https://trilokpropco.com" />
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
        </HelmetProvider>
    );
};

export default Main;
