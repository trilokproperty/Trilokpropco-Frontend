import { useEffect, useState } from "react";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import { endPoint } from "../../../Component/ForAll/ForAll";
import BlogCard from "../../../Component/BlogCard/BlogCard";
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    
    useEffect(()=>{
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

    return (
        <div>
            <SectionTitle value="Latest Blogs & Posts" />
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
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
                modules={[Pagination]}
                className="latest-properties-swiper mt-10 mx-auto !px-8"
            >
              {blogs?.map(blog => 
                    <SwiperSlide key={blog._id} className="mb-16">
                        <BlogCard blog={blog} />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default LatestBlogs;
