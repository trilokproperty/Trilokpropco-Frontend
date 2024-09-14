import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import { useState } from "react";
import { useEffect } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";
import Footer from "../../Component/Navigation/Footer";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState();
  const [footer, setFooter] = useState();
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
  return (
    <div className="overflow-hidden">
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
          <title>Services - Trilokpropco</title>
        </Helmet>
        <SectionTitle value="Services" color="white" />
      </div>

      <div>
        <p className="lg:w-1/2 md:w-3/4 w-[90%] mx-auto my-10 text-black border-b-4 border-[#046307] pb-4">
          Trilok Propco deal with luxury residential complex in Kolkata, mainly
          with fresh properties both under construction as well as ready to move
          properties. We search property according to your requirements, giving
          you the best quotation price from the developer, without charging
          brokerage from the client. Arranging site visit for the selected
          properties, showing you the best properties according to your
          requirements. We work with the renowned and nationalised developers of
          Kolkata. Our journey starts from your property search till your
          registration of your unit and later. Also guiding you with your home
          loan process.
        </p>

        <div className="mt-32 mx-10">
          <SectionTitle value="Our Workflow" />
          <div className="my-5 grid md:grid-cols-3 gap-8">
            {services?.map((item) => (
              <div
                key={item._id}
                className="relative flex flex-col items-center justify-center rounded-lg border border-transparent bg-white gap-5 p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
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
        <p>Email: <span className="font-light">{footer? footer[0]?.email :""}</span></p>
        <p>Address: <span className="font-light">{footer? footer[0]?.location :""}</span></p>
        <p>Phone: <span className="font-light">{footer? footer[0]?.contact :""}</span></p>
         <Link to='/contact'><button className="bg-white text-[#046307] font-semibold p-2 md:text-2xl px-5 rounded-lg mt-8">Contact Us</button></Link>
         </div>
         <div>
         <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d235850.66939636858!2d88.347353!3d22.535427!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2sbd!4v1726049472622!5m2!1sen!2sbd" className="md:w-[500px] md:h-[500px] rounded-lg"></iframe>
         </div>
         </div>
        </div>
      <Footer />
    </div>
  );
};

export default Services;
