import { Swiper, SwiperSlide } from 'swiper/react';
import './slider.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Slider() {
    return (
        <>
      <Swiper 
      navigation={false} 
      loop={true}
      autoplay={{
        delay: 6900,
        disableOnInteraction: false,
      }}  
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper w-full mt-[70px]">
        <SwiperSlide  className='img'><img className='w-full img' src="https://http2.mlstatic.com/D_NQ_961539-MLA71457505297_092023-OO.webp" alt="" /></SwiperSlide>
      </Swiper>
    </>
    )
}