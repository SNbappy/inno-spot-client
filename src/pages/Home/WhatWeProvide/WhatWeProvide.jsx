import React from 'react';
import i1 from "../../../assets/Card icons/1.svg"
import i2 from "../../../assets/Card icons/2.svg"
import i3 from "../../../assets/Card icons/3.svg"
import i4 from "../../../assets/Card icons/4.svg"
import i5 from "../../../assets/Card icons/5.svg"
import i6 from "../../../assets/Card icons/6.svg"

const WhatWeProvide = () => {
    return (
        <div className='max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0'>
            <h2 className='pt-20 pb-5 text-4xl font-bold text-center uppercase'>Discover Innovation</h2>
            <p className='pb-10 text-xl font-semibold text-center'>Discover, Explore, and Connect with the Latest and Greatest in Technology</p>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 sm:grid-cols-2 mb-28'>
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i1} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i2} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i3} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i4} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i5} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
                <div className='px-4 pb-8 text-center bg-white border-2'>
                    <img className='w-48 mx-auto' src={i6} alt="" />
                    <h2 className='text-xl font-bold'>Innovative Products</h2>
                    <p>Explore groundbreaking products that shape the future.</p>
                </div>
                
            </div>
        </div>
    );
};

export default WhatWeProvide;
