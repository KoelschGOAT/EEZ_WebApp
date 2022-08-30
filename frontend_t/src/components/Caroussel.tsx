import React from 'react';
// Import Swiper React components
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useGetCurrentClientVideos } from '../services/RequestVideos';
type Props = {};

const Caroussel = (props: Props) => {
  const { data } = useGetCurrentClientVideos();
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {data?.map((video) => (
        <SwiperSlide>
          {' '}
          <figure>
            <img
              draggable="false"
              className=" h-[28rem] hover:scale-110 transition duration-300 ease-in-out"
              src={`http://127.0.0.1:8000${video.screenshot}`}
              alt={video.title_de}
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Caroussel;
