'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import './slideShow.css'

import Image from 'next/image'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ width: '100vw', height: '500px' }}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={`/products/${image}`} width={600} height={500} alt={title} className='object-fill' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
