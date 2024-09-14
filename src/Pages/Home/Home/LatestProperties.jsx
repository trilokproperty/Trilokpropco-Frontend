import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from 'swiper/modules';
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
            <SectionTitle value="our Latest properties" />

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
                modules={[Pagination]}
                className="mySwiper"
            >
                {properties.map(property => (
                    <SwiperSlide key={property._id} className="mb-16">
                        <PropertyCard property={property} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default LatestProperties;
