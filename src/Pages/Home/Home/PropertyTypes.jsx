import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper/modules";

const PropertyTypes = () => {
  const [types, setTypes] = useState([]);
  const [typeCounts, setTypeCounts] = useState({});

  console.log(types, typeCounts);
  useEffect(() => {
    const fetchTypesAndProperties = async () => {
      try {
        const typeResponse = await fetch(`${endPoint}/type`);
        const typeData = await typeResponse.json();
        setTypes(typeData);

        const propertyResponse = await fetch(`${endPoint}/property`);
        const propertyData = await propertyResponse.json();

        const counts = typeData.reduce((acc, type) => {
          const count = propertyData.filter(
            (property) => property.type === type._id
          ).length;
          acc[type._id] = count;
          return acc;
        }, {});

        setTypeCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTypesAndProperties();
  }, []);
  return (
    <div className="lg:my-24 lg:mx-24 mx-5 md:mx-2 my-10">
      <SectionTitle value="Explore our properties" />

      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          350: {
            slidesPerView: 1.6,
          },
          430: {
            slidesPerView: 1.8,
          },
          490: {
            slidesPerView: 2,
          },
          550: {
            slidesPerView: 2.2,
          },

          640: {
            slidesPerView: 2.6,
          },
          700: {
            slidesPerView: 2.8,
          },
          900: {
            slidesPerView: 3.7,
          },
          1000: {
            slidesPerView: 4.5,
          },
          1300: {
            slidesPerView: 5,
          },
          1700: {
            slidesPerView: 7.5,
          },
        }}
        modules={[Pagination]}
        className="mySwiper mt-8"
      >
        {types?.map((type) => (
          <SwiperSlide key={type._id}>
            <div className="flex flex-col justify-center items-center mb-16">
            <div style={{
                backgroundImage:'url(https://i.ibb.co/JqpB1St/Ellipse-1.webp)',
                backgroundSize: 'auto',
                height:'100px',
                width:'100px',
                backgroundRepeat: 'no-repeat',
              }}
              className="flex justify-center items-center">
            <img
              src={type.logo}
              alt={type.type}
              className="w-[60px] h-[60px] my-10"
            />
            </div>
            <h6 className="text-xl mt-5">{type.type}</h6>
            <p className="bg-[#EBEEF2] w-[104px] text-center p-[2px] rounded-full drop-shadow-md mt-2">{typeCounts[type._id] || 0} Listing</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyTypes;
