import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import Contact from "../Home/Home/Contact";
import Footer from "../../Component/Navigation/Footer";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';
import React, { useState } from "react";
import { useEffect } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";

const ContactUs = () => {
    
  const [metaDatas, setMetaDatas] = useState(null);

  useEffect(() => {
      const fetchSEO = async () => {
          try {
              const response = await fetch(`/seocontact.json`);
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

    <div>
        <FloatingIcons/>
       <div
                className="pt-5 lg:h-96 h-40 md:h-56"
                style={{
                    backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Header />
                <Helmet>
                <meta charSet="utf-8" />                
          
                <title>{ metaDatas? metaDatas?.metaTitle :'Contact Us - Trilokpropco'}</title>
                <meta name="description" content={ metaDatas? metaDatas?.metaDescription : 'Default Description'} />
                <meta name="og:title" content={ metaDatas? metaDatas?.metaTitle : 'Default Title'} />
                <meta name="og:description" content={ metaDatas? metaDatas?.metaDescription : 'Default Description'} />
                <meta name="og:image" content={ metaDatas? metaDatas?.FeaturedImage : 'default-image-url.jpg'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={ metaDatas? metaDatas?.metaTitle : 'Default Title'} />
                <meta name="twitter:description" content={ metaDatas? metaDatas?.metaDescription : 'Default Description'} />
                <meta name="twitter:image" content={ metaDatas? metaDatas?.FeaturedImage : 'default-image-url.jpg'} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://trilokpropco.com/contact" />
                <link rel="canonical" href="https://trilokpropco.com/contact" />
                </Helmet>
                <SectionTitle value="Contact Us" color="white" />
          </div>
          <Contact />
          <Footer />      
    </div>
    </HelmetProvider>
    );
};

export default ContactUs;
