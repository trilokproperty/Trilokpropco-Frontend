import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from 'swiper/modules'; // Import Navigation module
import PropertyCard from "../../../Component/PropertyCard/PropertyCard";

const LatestProperties = () => {
    const [properties, setProperties] = useState([]);

    console.log(properties);

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

    return (
        <div className="mt-4 mb-24 lg:ml-24 lg:mx-0 mx-5">
            <SectionTitle value="Our Latest Properties" />

            {/* Custom navigation buttons */}
            <div className="relative">
                <button className="swiper-button-prev-custom absolute left-0 z-10 text-2xl bg-white p-3 rounded-full shadow-lg">
                    &lt; {/* Left arrow */}
                </button>
                <button className="swiper-button-next-custom absolute right-0 z-10 text-2xl bg-white p-3 rounded-full shadow-lg">
                    &gt; {/* Right arrow */}
                </button>

                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom', // Attach the custom button to Swiper
                        nextEl: '.swiper-button-next-custom', // Attach the custom button to Swiper
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
