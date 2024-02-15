'use client'
import React, { useState } from 'react'
import { Swiper as SwipperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import './slideShow.css'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
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
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image src={`/products/${image}`} width={1024} height={800} alt={title} className='rounded object-fill' />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
