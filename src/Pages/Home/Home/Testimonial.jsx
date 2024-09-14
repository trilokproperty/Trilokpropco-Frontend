import { useEffect, useState } from "react";
import { endPoint } from "../../../Component/ForAll/ForAll";
import SectionTitle from "../../../Component/ForAll/SectionTitle";
import TestimonialCard from "../../../Component/ForAll/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonial = async () => {
            try {
                const response = await fetch(`${endPoint}/testimonial`);
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchTestimonial();
    }, []);

    useEffect(() => {
        const applyInitialStyles = () => {
            const swiper = document.querySelector('.testimonial-swiper').swiper;
            if (swiper) {
                const slides = swiper.slides;
                slides.forEach((slide, index) => {
                    if (index === swiper.activeIndex) {
                        slide.style.opacity = '1';
                        slide.style.transform = 'scale(1.1)';
                    } else {
                        slide.style.opacity = '0.5';
                        slide.style.transform = 'scale(1)';
                    }
                });
            }
        };

        applyInitialStyles();
    }, [testimonials]);

    const applySlideStyles = (swiper) => {
        const slides = swiper.slides;
        slides.forEach((slide, index) => {
            if (index === swiper.activeIndex) {
                slide.style.opacity = '1';
                slide.style.transform = 'scale(1.1)';
            } else {
                slide.style.opacity = '0.5';
                slide.style.transform = 'scale(1)';
            }
        });
    };

    const handleSlideChange = (swiper) => {
        applySlideStyles(swiper);
    };

    return (
        <div className="my-24 md:mx-10 mx-2">
            <SectionTitle value="What Our Client Says" />
            <div className="relative">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    initialSlide={1} // Set the second slide as the default
                    onSwiper={(swiper) => applySlideStyles(swiper)} // Apply styles on initial load
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        0:{
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper testimonial-swiper mt-16 mx-auto"
                >
                    {testimonials.map(testimonial => 
                        <SwiperSlide key={testimonial._id} className="transition-opacity duration-300 py-10 pb-20">
                            <TestimonialCard testimonial={testimonial} />
                        </SwiperSlide>
                    )}
                </Swiper>

                {/* Custom navigation buttons */}
                <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 !text-[#6d6d6d3f] hover:!text-[#6d6d6d9d]">
                    <FaArrowLeft className="text-3xl !text-[#6d6d6d3f] cursor-pointer" />
                </div>
                <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 !text-[#6d6d6d3f] hover:!text-[#6d6d6d9d]">
                    <FaArrowRight className="text-3xl !text-[#6d6d6d3f] cursor-pointer hover:!text-[#6d6d6d9d]" />
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
