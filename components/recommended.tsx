"use client";
import React, { useEffect, useState } from 'react'
import SectionHeaders from './sectionHeaders';
import Link from 'next/link';
import {Swiper, SwiperSlide} from 'swiper/react';
import { AlignCenter, ChevronLeft, ChevronRight } from 'lucide-react';


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import SwiperCard from './ui/swiperCard';
import { get } from 'mongoose';


const getData = async () => {
    try {
      const res = await fetch("/api/package?page=1&limit=7");
      const data = await res.json();
      if (data.packageDatas) {
        return data.packageDatas;
      }
    } catch (error) {
      console.log(error);
    }
  };

export default function RecPack() {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData().then((res) => {
        setData(res);
        })
    }, []);
    return (
        <div className="text-center">
            <SectionHeaders
            subHeader={"Here's"}
            mainHeader={"Recommended"}
            />
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                centeredSlidesBounds={true}
                slidesPerView={1}
                width={350}
                loop={true}
                slideToClickedSlide={true}
                coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                hideOnClick: false,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container p-20 h-[370px] my-5"
            >
                <div className='w-[250px]'>
                    {data?.map((value: any) => (
                        <SwiperSlide >
                            <div key={value._id} className="h-[315px]">
                                <SwiperCard data={value}/>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
                <div className="slider-controler">
                <div className="swiper-button-prev slider-arrow">
                    <ChevronLeft />
                </div>
                <div className="swiper-button-next slider-arrow">
                    <ChevronRight />
                </div>
                <div className="swiper-pagination"></div>
                </div>
            </Swiper>

            <div className="text-center mb-24 ">
                <Link
                type="button"
                href={"/package"}
                className="mt-6 uppercase bg-primary text-white rounded-full px-6 py-2 hover:bg-third hover:text-second"
                >
                Others
                </Link>
            </div>
        </div>
    )
}
