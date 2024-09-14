import { useEffect, useState } from 'react';
import { endPoint } from '../../../Component/ForAll/ForAll';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../Component/ForAll/SectionTitle';

const Partners = () => {
  const [partners, setPartners] = useState();
 console.log(partners)
  useEffect(() =>{
    const fetchPartners = async () => {
      const response = await fetch(`${endPoint}/partner`);
      const data = await response.json();

      setPartners(data)

    }

    fetchPartners()
  }, [])
    return (
    <div className='mb-16'>
      <SectionTitle value= "Our Partners"> </SectionTitle>  

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
          700:{
            slidesPerView:2.8,
          },
          900:{
            slidesPerView: 3.7,
          },
          1000:{
            slidesPerView:4.5,
          },
          1300: {
            slidesPerView: 5.5,
          },
          1700: {
            slidesPerView: 7.5,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      {
        partners?.map(partner =>
          <SwiperSlide key={partner._id}>
            <img src={partner.images[0].url} alt=""  className='rounded-2xl drop-shadow-lg w-[261px] h-[110px] my-10'/>
          </SwiperSlide>
        )
      }
      </Swiper>
    </div>
    );
};

export default Partners;