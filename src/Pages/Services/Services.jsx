import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import { useState } from "react";
import { useEffect } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";
import FloatingIcons from '../../Component/ForAll/FloatingIcons';
import Footer from "../../Component/Navigation/Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState();
  const [footer, setFooter] = useState();
  const [sectionDes, setSectionDes] = useState();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${endPoint}/service`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchServices();
    const fetchServiceDes = async () => {
      try {
        const response = await fetch(`${endPoint}/service/text`);
        const data = await response.json();
        setSectionDes(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchServiceDes();
    const fetchFooter = async()=>{
        try {
            const response = await fetch(`${endPoint}/footer`);
            const data = await response.json();
            setFooter(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }
    fetchFooter()
  }, []);
  


  const [metaDatas, setMetaDatas] = useState(null);

  // useEffect(() => {
  //     const fetchSEO = async () => {
  //         try {
  //             const response = await fetch(`/seoservices.json`);
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
  // console.log(sectionDes)
  return (
    <HelmetProvider>

    <div className="overflow-hidden">
      <FloatingIcons/>
      <div
        className="pt-5 lg:h-96 h-40 md:h-56"
        style={{
          backgroundImage: `url(https://i.ibb.co/NT6PZjt/16406692-rm378-02c.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <Helmet>
          <meta charSet="utf-8" />

          
          <title>{ metaDatas? metaDatas?.metaTitle :'Trilok Propco | Expert in Real Estate Services in Kolkata'}</title>
          <meta name="description" content={ metaDatas? metaDatas?.metaDescription : 'From buying and selling, Trilok Propco offers the best real estate solutions in Kolkata. Find the perfect villa, home, or commercial space with us.'} />
          <meta name="og:title" content={ metaDatas? metaDatas?.metaTitle : 'Trilok Propco | Expert in Real Estate Services in Kolkata'} />
          <meta name="og:description" content={ metaDatas? metaDatas?.metaDescription : 'Default Description'} />
          <meta name="og:image" content={ metaDatas? metaDatas?.FeaturedImage : 'default-image-url.jpg'} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={ metaDatas? metaDatas?.metaTitle : 'Trilok Propco | Expert in Real Estate Services in Kolkata'} />
          <meta name="twitter:description" content={ metaDatas? metaDatas?.metaDescription : 'Default Description'} />
          <meta name="twitter:image" content={ metaDatas? metaDatas?.FeaturedImage : 'default-image-url.jpg'} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://trilokpropco.com/services" />
          <link rel="canonical" href="https://trilokpropco.com/services" />
          
        </Helmet>
        <SectionTitle value="Services" color="white" />
      </div>

      <div>
        {sectionDes?.map(des => (
  <p
    className="lg:w-1/2 md:w-3/4 w-[90%] mx-auto my-10 text-black border-b-4 border-[rgb(4,99,7)] pb-4 list-card-text"
    key={des._id}
  >
    {des?.serviceDes}
  </p>
))}


        <div className="mt-32 mx-10">
          <SectionTitle value="Our Workflow" />
          <div className="my-5 grid md:grid-cols-3 gap-8">
            {services?.map((item) => (
              <div
                key={item._id}
                className="relative flex flex-col items-center justify-center rounded-lg border border-transparent bg-white gap-5 p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 "
                style={{
                  borderImage: "linear-gradient(45deg, #C19554, #E7C578) 1",
                }}
              >
                {/* Logo */}
                <img
                  src={item?.logo}
                  alt={item?.name}
                  className="w-1/3 transition-transform duration-300 ease-in-out hover:scale-110"
                />

                {/* name with gradient text */}
                <h2
                  className="text-2xl text-center font-semibold mt-4"
                  style={{
                    background: "linear-gradient(45deg, #C19554, #E7C578)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item?.name}
                </h2>

                {/* details (initially hidden) */}
                <p className="text-[18px] text-gray-700 text-center leading-relaxed mt-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 absolute top-full bg-white p-4 rounded-lg shadow-lg">
                  {item?.details}
                </p>

                {/* Hover overlay for details */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 hover:bg-white/80 transition-opacity duration-300 ease-in-out hover:opacity-100 rounded-lg">
                  <p className="text-[18px] text-black text-center leading-relaxed">
                    {item?.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#046307] mt-16 p-10 flex justify-center flex-col items-center">
         <SectionTitle value="Contact Us" color="white"/>
         <div className=" mt-8 md:flex items-center justify-between gap-10">
         <div className="text-white md:mb-0 mb-6">
        <h3 className="md:text-3xl text-xl font-semibold">Trilok Property Consultant</h3>
        <p>Email: <span className="font-light">{footer? footer[0]?.email :""}</span></p>
        <p>Phone: <span className="font-light">{footer? footer[0]?.contact :""}</span></p>
        <p>Address: <span className="font-light">{footer? footer[0]?.location :""}</span></p>
        <p>RERA Registered : <span className="font-light">{footer? footer[0]?.regis :""}</span></p>
         <Link to='/contact'><button className="bg-white text-[#046307] font-semibold p-2 md:text-2xl px-5 rounded-lg mt-8">Contact Us</button></Link>
         </div>
         <div>
         <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235850.66939636858!2d88.347353!3d22.535427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1726049472622!5m2!1sen!2sbd" className="md:w-[500px] md:h-[500px] rounded-lg"></iframe>
         </div>
         </div>
        </div>
      <Footer />
    </div>
    </HelmetProvider>
  );
};

export default Services;
