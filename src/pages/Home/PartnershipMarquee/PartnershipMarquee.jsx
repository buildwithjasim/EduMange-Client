import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../../../assets/brands/brand1.png';
import brand2 from '../../../assets/brands/brand2.png';
import brand3 from '../../../assets/brands/brand3.png';
import brand4 from '../../../assets/brands/brand4.png';
import brand5 from '../../../assets/brands/brand5.png';
import brand6 from '../../../assets/brands/brand6.png';
import brand7 from '../../../assets/brands/brand7.png';

const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const PartnershipMarquee = () => {
  return (
    <div className="bg-gray-50 py-6">
      <h2 className="text-center text-xl mt-6 font-semibold mb-6 text-gray-700">
        Our Partnership Brands
      </h2>
      <Marquee speed={50} pauseOnHover gradient={false}>
        {brandLogos.map((logo, index) => (
          <div key={index} className="mx-10">
            <img
              src={logo}
              alt={`Brand ${index + 1}`}
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default PartnershipMarquee;
