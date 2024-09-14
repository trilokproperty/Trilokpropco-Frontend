import { Helmet } from "react-helmet";
import Header from "../../Component/Navigation/Header";
import Footer from "../../Component/Navigation/Footer";
import SectionTitle from "../../Component/ForAll/SectionTitle";
import { useEffect, useState } from "react";
import { endPoint } from "../../Component/ForAll/ForAll";
import { Link } from "react-router-dom";

const About = () => {
    const [about, setAbout] = useState();
    const [footer, setFooter] = useState();
    const [why, setWhy] = useState();
    const [partners, setPartners] = useState();
    console.log(footer)
    useEffect(()=>{
        const fetchAbout = async()=>{
            try {
                const response = await fetch(`${endPoint}/about`);
                const data = await response.json();
                setAbout(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchAbout()

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

        const fetchWhy = async()=>{
            try {
                const response = await fetch(`${endPoint}/why`);
                const data = await response.json();
                setWhy(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchWhy()
        const fetchPartners = async()=>{
            try {
                const response = await fetch(`${endPoint}/partner`);
                const data = await response.json();
                setPartners(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }
        fetchPartners()
    },[])

    return (
    <div>
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
                <title>About Us - Trilokpropco</title>
                </Helmet>
                <SectionTitle value="About Us" color="white" />
          </div> 

        <div className="md:flex gap-5 mx-5 md:mx-5 lg:mx-14 md:mx-8 rounded-lg shadow-md md:mt-20 mt-4 mb-10 lg:p-14 text-black items-center bg-[#04630742] p-5">
            <div>
           <h2 className="text-3xl font-semibold mb-2">Company History</h2>
            <p>{about?.history}</p>
            </div>
            <img src={footer ? footer[0]?.image :""} alt="Trilokpropco - Real Estate Agency." className="lg:w-[300px] w-[200px] h-[120px] lg:h-[180px]" />
        </div> 

        <div className="mx-5 lg:mx-14 md:mx-8 mt-10 mb-14 lg:flex items-center gap-5">
            <div className="md:flex gap-5 items-center bg-[#04630742] p-8 rounded-lg shadow-md lg:w-1/2 lg:h-[350px] mb-4 lg:mb-0">
                <div>
                <h2 className="text-3xl font-semibold mb-2">Our Mission</h2>
                <p>{about?.mission}</p>
                </div>
                <img src="https://i.ibb.co.com/NynhxyC/pngegg-2.webp" alt="Trilokpropco - Our Mission" className="md:w-[300px] md:h-[180px]" />
            </div>

            <div className="md:flex gap-5 items-center bg-[#04630742] p-8 rounded-lg shadow-md lg:w-1/2 lg:h-[350px]">
                <div>
                <h2 className="text-3xl font-semibold mb-2">Our Vision</h2>
                <p>{about?.vision}</p>
                </div>
                <img src="https://i.ibb.co.com/hFqyrJL/pngwing-com-3.webp" alt="Trilokpropco - Our Vision" className="md:w-[300px] md:h-[180px]" />
            </div>
        </div>

        <div className="md:flex gap-10 mx-5 lg:mx-14 md:mx-8 rounded-lg shadow-md mt-20 mb-10 lg:p-14 p-6 text-black items-center bg-[#ffffff1d] border">
            
            <div style={{
                backgroundImage:'url(https://i.ibb.co.com/BzrdmR3/pngegg-3.webp)',
                backgroundSize:'contain',
                backgroundPosition:'center',
                padding:'30px',
                backgroundRepeat:'no-repeat'
            }} className="lg:w-[2000px] md:w-[3000px] relative">
            <img src={about?.founderLogo} alt="Mr. Anirban Manna - Trilok Propco" className="rounded-tr-[30px] rounded-bl-[30px] md:mb-0 mb-4"/>
            <div className="bg-white p-3 rounded-tr-[30px] rounded-bl-[30px] absolute lg:top-[60%] lg:left-[-50px] shadow-lg md:top-[-30px] top-0 left-0 md:text-[15px] text-[12px]">
                <h5>8 years of experience</h5>
                <p>Business Development</p>
            </div>
            <div className="bg-white p-3 rounded-tr-[30px] rounded-bl-[30px] absolute lg:bottom-0 lg:right-[-30px] shadow-lg bottom-5 right-1  md:text-[15px] text-[12px]">
                <p>5 years of cross</p>
                <p>country experience</p>
            </div>
            </div>
            <div>
            <h2 className="text-3xl font-semibold mb-2">Founder</h2>
            <p>{about?.founder}</p>
            </div>
        </div>

        <div className="mt-32 mx-10">
  <SectionTitle value="why choose us" />
  <div className="my-5 grid md:grid-cols-3 gap-8">
    {why?.map(item => (
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
          alt={item?.title}
          className="w-1/3 transition-transform duration-300 ease-in-out hover:scale-110"
        />

         {/* Title with gradient text */}
  <h2
    className="text-2xl text-center font-semibold mt-4"
    style={{
      background: "linear-gradient(45deg, #C19554, #E7C578)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {item?.title}
  </h2>

        {/* Description (initially hidden) */}
        <p className="text-[18px] text-gray-700 text-center leading-relaxed mt-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 absolute top-full bg-white p-4 rounded-lg shadow-lg">
          {item?.description}
        </p>

        {/* Hover overlay for description */}
        <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-0 hover:bg-white/80 transition-opacity duration-300 ease-in-out hover:opacity-100 rounded-lg">
          <p className="text-[18px] text-black text-center leading-relaxed">
            {item?.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>



        <div className="mt-32 mx-10">
        <SectionTitle value="Partners"/>
         
         <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-6 mt-10 w-1/2 md:w-3/4 mx-auto">
            {
                partners?.map(partner => <div className="rounded-lg border flex items-center justify-center w-full" key={partner._id}>
                    <img src={partner?.images[0]?.url} alt={partner.name} />
                    </div>
                        )
            }
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

export default About;