'use client'
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
// Import required modules
import { Autoplay, A11y, Pagination, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

const ClientsTestimonials = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  // Array of testimonial data
  const testimonials = [
    {
      text: "This platform made finding my dream job so easy! The interface is intuitive, and I got responses from employers within days.",
      name: "Robert Fox",
      role: "UI/UX Designer",
      image: "https://res.cloudinary.com/diez3alve/image/upload/v1749142471/9_g7vyzh.jpg"
    },
    {
      text: "I landed a remote marketing role thanks to the tailored job recommendations and seamless application process.",
      name: "Emily Johnson",
      role: "Product Manager",
      image: "https://res.cloudinary.com/diez3alve/image/upload/v1749143652/businessman-black-suit-with-tie-posing_i1pj2s.jpg"
    },
    {
      text: "The job alerts kept me updated on new opportunities in my field, and the resume builder was a game-changer!",
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://res.cloudinary.com/diez3alve/image/upload/v1749143653/medium-shot-man-working-as-real-estate-agent_jcit0r.jpg"
    },
    {
      text: "As a recruiter, this site helped me find top talent quickly with its advanced filtering and candidate matching tools.",
      name: "Sarah Williams",
      role: "Marketing Specialist",
      image: "https://res.cloudinary.com/diez3alve/image/upload/v1749143653/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_k4b1hd.jpg"
    },
    {
      text: "The career resources and interview tips gave me the confidence to ace my interview and secure a promotion.",
      name: "David Brown",
      role: "Data Analyst",
      image: "https://res.cloudinary.com/diez3alve/image/upload/v1749143654/young-male-entrepreneur-making-eye-contact-against-blue-background_gor8ty.jpg"
    }
  ];

  return (
   <div className='bg-[#F1F2F4]'>
     <div className='max-w-7xl flex items-center gap-2 py-20 px-0 mx-auto relative'>
      {/* Navigation Buttons */}
      <button
        className="prev-button h-[3rem] w-[3rem] text-center bg-[#FFF] text-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowLeft/>
      </button>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign Swiper instance
        className='max-w-7xl mx-auto relative custom-swiper'
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1024: { slidesPerView: 3, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          320: { slidesPerView: 1, spaceBetween: 2 }
        }}
        navigation={false} // Disable default navigation
        spaceBetween={10}
        modules={[Navigation, Pagination, A11y, Autoplay]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl hover:shadow-md p-6 max-w-lg border border-gray-200">
              {/* Star Ratings */}
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" stroke="currentColor" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg italic mb-4">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} Avatar`}
                  className="w-12 h-12 rounded-full border-2 border-yellow-500"
                  width={48}
                  height={48}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="next-button h-[3rem] w-[3rem] text-center hover:bg-blue-600 hover:text-white bg-[#FFF] text-blue-600 px-2 py-1 rounded-md"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowRight/>
      </button>
    </div>
    <div> </div>
   </div>
  );
};

export default ClientsTestimonials;