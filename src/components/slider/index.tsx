import { Swiper, SwiperSlide } from 'swiper/react';
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
        <SwiperSlide><img className='w-full h-52' src="https://http2.mlstatic.com/D_NQ_603826-MLA71457796186_092023-OO.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-52' src="https://http2.mlstatic.com/D_NQ_961539-MLA71457505297_092023-OO.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-52' src="https://http2.mlstatic.com/D_NQ_724172-MLA71550485047_092023-OO.webp" alt="" /></SwiperSlide>
      </Swiper>
    </>
    )
}