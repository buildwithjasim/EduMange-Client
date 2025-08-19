import React from 'react';
import Marquee from 'react-fast-marquee';

import brand2 from '../../../assets/brands/brand2.png';
import brand3 from '../../../assets/brands/brand3.png';
import brand4 from '../../../assets/brands/brand4.png';
import brand5 from '../../../assets/brands/brand5.png';
import brand6 from '../../../assets/brands/brand6.png';
import brand7 from '../../../assets/brands/brand7.png';

const brandLogos = [brand2, brand3, brand4, brand5, brand6, brand7];

const PartnershipMarquee = () => {
  return (
    <section className="bg-background dark:bg-background py-12 transition-colors duration-300">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10 text-primary">
        🤝 Our Partnership Brands
      </h2>

      <Marquee speed={60} pauseOnHover gradient={false} className="space-x-8">
        {brandLogos.map((logo, index) => (
          <div
            key={index}
            className="mx-4 p-6 rounded-2xl bg-background/80 dark:bg-background/50 backdrop-blur-md shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-400 flex items-center justify-center cursor-pointer"
          >
            <img
              src={logo}
              alt={`Brand ${index + 1}`}
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnershipMarquee;
