import { useEffect, useState, useRef } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";
import BlogCard from "../../../Component/BlogCard/BlogCard";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${endPoint}/blog`);
                const data = await response.json();

                // Sort by date and limit to the first 8 blogs
                const sortedBlogs = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 8);

                setBlogs(sortedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    // Initialize Swiper navigation after buttons are ready
    useEffect(() => {
        if (prevRef.current && nextRef.current && !initialized) {
            setInitialized(true);
        }
    }, [prevRef, nextRef, initialized]);

    return (
        <div>
            <SectionTitle value="Latest Blogs & Posts" />

            <div className="relative">
                {/* Previous Button */}
                <div
                    ref={prevRef}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 p-3 cursor-pointer bg-[#ffffff69] rounded-full text-gray-800"
                >
                    <FaAngleLeft size={24} />
                </div>

                {/* Next Button */}
                <div
                    ref={nextRef}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 p-3 cursor-pointer bg-[#ffffff69] rounded-full text-gray-800"
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
                        640: {
                            slidesPerView: 1.5,
                        },
                        768: {
                            slidesPerView: 2.2,
                        },
                        1024: {
                            slidesPerView: 2.5,
                        },
                        1280: {
                            slidesPerView: 3,
                        },
                        1500: {
                            slidesPerView: 4,
                        },
                        2000: {
                            slidesPerView: 6,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="latest-properties-swiper mt-10 mx-auto !px-8"
                >
                    {blogs?.map(blog => 
                        <SwiperSlide key={blog._id} className="mb-16">
                            <BlogCard blog={blog} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            <div className="flex justify-center">
                <Link to={`/blog`}>
                    <button className="px-7 py-2 mt-4 bg-[#046307] text-white rounded font-extralight flex justify-center items-center gap-2">
                        More News
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestBlogs;
