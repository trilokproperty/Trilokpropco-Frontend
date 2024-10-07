// https://i.ibb.co/HBxYv2H/emoticon-happy.webp
// https://i.ibb.co/Y8KMFDn/Mask-group-3.webp
// https://i.ibb.co/LrW9b6S/Mask-group-6.webp
// https://i.ibb.co/Pt39cv1/Mask-group-7.webp

import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";

const Info = () => {
  const [totalProperties, setTotalProperties] = useState(0);
  const [propertiesForSale, setPropertiesForSale] = useState(0);
  const [happyCustomers, setHappyCustomers] = useState(60); // Static value for demonstration, can be dynamic if needed
  const [exclusiveProperties, setExclusiveProperties] = useState(60); // Static value for demonstration, can be dynamic if needed

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${endPoint}/property`);
        const data = await response.json();

        // Total number of properties
        setTotalProperties(data.length);

        // Filter and count properties for sale
        const forSale = data.filter((property) => property.for === 'Sale').length;
        setPropertiesForSale(forSale);
        // Filter and count exclusive properties
    const exclusiveProperties = data.filter((property) => property.exclusive === true);
    setExclusiveProperties(exclusiveProperties?.length);

      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();

    const fetchTestimonials = async()=>{
      const response = await fetch(`${endPoint}/testimonial`);
        const data = await response.json();

        // Total number of testimonials for happy customers
        setHappyCustomers(data?.length);
    }
    fetchTestimonials()
  }, []);

  return (
    <div className="flex gap-5 md:gap-10 my-20 justify-center flex-wrap">
      {/* Total Properties */}
      <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/Y8KMFDn/Mask-group-3.webp" alt="total properties" />
        <img src="https://i.ibb.co/Y8KMFDn/Mask-group-3.webp" alt="total properties" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10" />

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">{totalProperties}</h3>
        <p className="text-[#fff] text-[13px]">total properties</p>
      </div>

      {/* Properties for Sale */}
      <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/Pt39cv1/Mask-group-7.webp" alt="properties for sale" />
        <img src="https://i.ibb.co/Pt39cv1/Mask-group-7.webp" alt="properties for sale" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10" />

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">{propertiesForSale}</h3>
        <p className="text-[#fff] text-[13px]">properties for sale</p>
      </div>

      {/* Sold Properties (Static for now) */}
      <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/LrW9b6S/Mask-group-6.webp" alt="sold properties" />
        <img src="https://i.ibb.co/LrW9b6S/Mask-group-6.webp" alt="sold properties" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10" />

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">{exclusiveProperties}</h3> {/* This could be dynamic if needed */}
        <p className="text-[#fff] text-[13px]">exclusive properties</p>
      </div>

      {/* Happy Customers */}
      <div className="bg-[#181818] text-center w-[200px] h-[200px] flex items-center justify-center flex-col relative overflow-hidden">
        <img src="https://i.ibb.co/HBxYv2H/emoticon-happy.webp" alt="happy customers" />
        <img src="https://i.ibb.co/HBxYv2H/emoticon-happy.webp" alt="happy customers" className="absolute right-0 bottom-0 rotate-[-50deg] opacity-10" />

        <h3 className="text-[#e2e7ee] text-[38px] font-bold">{happyCustomers}</h3>
        <p className="text-[#fff] text-[13px]">happy customers</p>
      </div>
    </div>
  );
};

export default Info;
