import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";
import { FaFacebook, FaInstagram, FaLinkedin, FaPhone, FaRegEnvelope, FaWhatsapp, FaX, FaYoutube } from "react-icons/fa6";
import { AiFillCaretRight } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footers, setFooters] = useState();
  console.log(footers);
  useEffect(() => {
    const fetchFooters = async () => {
      const response = await fetch(`${endPoint}/footer`);
      const data = await response.json();
      setFooters(data[0]);
    };
    fetchFooters();
  }, []);

  return (
    <div
      style={{
        background: "url(https://i.ibb.co/dkBPKPz/footer-bg.webp), #F4F6F8",
        backgroundPosition: "center",
        backgroundSize: "contain",
        opacity: "0.8",
        width: "100%",
      }}
    >
      <div className="md:flex lg:gap-3 md:gap-2 md:px-2 lg:px-5 justify-center md:h-[400px] py-10 px-10 items-start md:pt-20">
        <div className="md:w-[25%] w-full flex flex-col items-center md:mt-0 mt-5">
          <img src={footers?.image} alt="Trilok Propco - Real Estate Website" className="w-[105px] h-[53px]" />
          <p className="text-[#454545]">{footers?.description}</p>
          <h6 className="text-xl font-semibold mt-4 text-black">Follow us</h6>

          <div className="flex gap-2">
            <a href={footers?.facebook}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaFacebook />
              </div>
            </a>
            <a href={footers?.instagram}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaInstagram />
              </div>
            </a>
            <a href={footers?.linkedin}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaLinkedin />
              </div>
            </a>
            <a href={footers?.twitter}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaX />
              </div>
            </a>
            <a href={footers?.whatsapp}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaWhatsapp />
              </div>
            </a>
            <a href={footers?.youtube}>
              <div className="text-[#5B687C] bg-[#2a323c34] w-[32px] h-[32px] flex justify-center items-center rounded-[4px] text-xl">
                <FaYoutube />
              </div>
            </a>
          </div>
        </div>

        <div className="md:w-[14%] w-full flex flex-col items-center md:mt-0 mt-5">
          <h6 className="text-xl font-semibold text-black mb-2">About Us</h6>
          <div className="flex gap-3 flex-col">
            <Link to="#">
              <p className="text-[#1B5638] font-[400] flex items-center ">
                <span className="flex gap-[-10px]">
                  <GoDotFill />
                  <AiFillCaretRight />
                </span>
                How It Works
              </p>
            </Link>
            <Link to="/" className="text-[#454545]">
              Home
            </Link>
            <Link to="/about" className="text-[#454545]">
              <p>About</p>
            </Link>
            <Link to="#" className="text-[#454545]">
              <p>Career</p>
            </Link>
            <Link to="/contact" className="text-[#454545]">
              <p>Contact Us</p>
            </Link>
            <Link to="#" className="text-[#454545]">
              <p>FAQ's</p>
            </Link>
          </div>
        </div>

        <div className="md:w-[20%] w-full flex flex-col items-center md:mt-0 mt-5">
          <h6 className="text-xl font-semibold text-black mb-6">Free Consultation</h6>
          <img src="https://i.ibb.co.com/f1bx4f8/best-service-png.webp" alt="" />
          <a href="tel:+91-9831775758">
            <button className="btn bg-[#046307] text-white mt-4">Schedule Now</button>
          </a>
        </div>

        <div className="md:w-[20%] w-full flex flex-col items-center md:mt-0 mt-5">
          <h6 className="text-xl font-semibold text-black mb-6">Support & Summary</h6>
          <div className="flex gap-3 flex-col">
            <Link to="#" className="text-[#454545]">
              <p>Helping Center</p>
            </Link>
            <Link to="#" className="text-[#454545]">
              <p>Privacy & Policy</p>
            </Link>
            <Link to="#" className="text-[#454545]">
              <p>Buy or Rent</p>
            </Link>
            <Link to="/properties" className="text-[#454545]">
              <p>Properties</p>
            </Link>
            <Link to="/blog" className="text-[#454545]">
              <p>Blogs</p>
            </Link>
          </div>
        </div>

        <div className="md:w-[25%] w-full flex flex-col items-center md:mt-0 mt-5">
          <h6 className="text-xl font-semibold text-black mb-5">Contact Us</h6>
          <div className="flex gap-3 flex-col">
            <div className="flex gap-3 items-center">
              <div className="w-[10%]">
                <div className="bg-[#2a323c34] w-[40px] h-[40px] flex items-center justify-center text-[20px] rounded-full">
                  <FaRegEnvelope />
                </div>
              </div>
              <div className="md:ml-2">
                <p className="text-[18px] text-black font-semibold">E-mail</p>
                <a href={`mailto:${footers?.email}`}>
                  <p className="text-[#454545]">{footers?.email}</p>
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-[10%]">
                <div className="bg-[#2a323c34] w-[40px] h-[40px] flex items-center justify-center text-[20px] rounded-full">
                  <FaPhone />
                </div>
              </div>
              <div className="md:ml-2">
                <p className="text-[18px] text-black font-semibold">Contact</p>
                <a href={`tel:${footers?.contact}`}>
                  <p className="text-[#454545]">{footers?.contact}</p>
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-[10%]">
                <div className="bg-[#2a323c34] !w-[40px] !h-[40px] flex items-center justify-center text-[20px] rounded-full">
                  <CiLocationOn />
                </div>
              </div>
              <div className="md:ml-2">
                <p className="text-[18px] text-black font-semibold">Location</p>
                <a href="#">
                  <p className="text-[#454545]">{footers?.location}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-black w-[90%] mx-auto" />
      <div className="footer-bottom py-5 md:px-5 flex justify-center items-center">
        <p className="text-[#8A8A8A] text-[16px]">©2024 TRILOK PROPERTY CO</p>
      </div>
    </div>
  );
};

export default Footer;
