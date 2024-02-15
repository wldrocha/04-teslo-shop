'use client'
import React, { useState } from 'react'
import { Swiper as SwipperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import './slideShow.css'
import Image from 'next/image'

interface Props {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwipperObject>()
  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{delay: 2500, disableOnInteraction: false}}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={`/products/${image}`} width={1024} height={800} alt={title} className='rounded object-fill' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={`/products/${image}`} width={250} height={250} alt={title} className='rounded object-fill' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
