import { useEffect, useState, useRef } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaAngleLeft,
  FaAngleRight
} from "react-icons/fa6";
// Import required modules
import { Pagination, Navigation } from 'swiper/modules'; // Import Navigation module
import PropertyCard from "../../../Component/PropertyCard/PropertyCard";

const LatestProperties = () => {
    const [properties, setProperties] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [initialized, setInitialized] = useState(false);

    // Fetch properties from the API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${endPoint}/property`);
                const data = await response.json();

                // Sort by date and limit to the first 8 properties
                const sortedProperties = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 8);

                setProperties(sortedProperties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    // Update the Swiper instance once the refs for custom buttons are assigned
    useEffect(() => {
        if (prevRef.current && nextRef.current && !initialized) {
            setInitialized(true);
        }
    }, [prevRef, nextRef, initialized]);

    return (
        <div className="mt-4 mb-24 lg:ml-24 lg:mx-0 mx-5">
            <SectionTitle value="Our Latest Properties" />

            {/* Custom navigation buttons */}
            <div className="relative">
                {/* Previous Button */}
                <div
                    ref={prevRef}
                    className="absolute md:block hidden !bg-[#ffffff69] !text-gray-800 p-2 rounded-full left-5 top-[40%] transform -translate-y-1/2 z-20 cursor-pointer"
                >
                    <FaAngleLeft size={24} />
                </div>

                {/* Next Button */}
                <div
                    ref={nextRef}
                    className="absolute right-5 md:block hidden top-[40%] !bg-[#ffffff69] !text-gray-800 p-2 rounded-full transform -translate-y-1/2 z-20 cursor-pointer"
                >
                    <FaAngleRight size={24} />
                </div>

                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={initialized ? {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    } : false}
                    onBeforeInit={(swiper) => {
                        // Assign the navigation elements to the Swiper instance
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    onSwiper={(swiper) => {
                        if (initialized) {
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        350: {
                            slidesPerView: 1,
                        },
                        430: {
                            slidesPerView: 1,
                        },
                        490: {
                            slidesPerView: 1,
                        },
                        550: {
                            slidesPerView: 1.5,
                        },
                        640: {
                            slidesPerView: 1.6,
                        },
                        700: {
                            slidesPerView: 2,
                        },
                        900: {
                            slidesPerView: 2.5,
                        },
                        1000: {
                            slidesPerView: 2.8,
                        },
                        1300: {
                            slidesPerView: 3.5,
                        },
                        1700: {
                            slidesPerView: 4.5,
                        },
                    }}
                    modules={[Pagination, Navigation]} // Include Navigation module
                    className="mySwiper"
                >
                    {properties.map(property => (
                        <SwiperSlide key={property._id} className="mb-16">
                            <PropertyCard property={property} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default LatestProperties;
