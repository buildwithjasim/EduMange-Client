import React from 'react';
import Banner from '../Banner/Banner';
import PartnershipMarquee from '../PartnershipMarquee/PartnershipMarquee';
import FeedbackCarousel from '../FeedBackSection/FeedBackSection';
import StatsSection from '../StatusSection/StatusSection';
import BecomeInstructor from '../BecomeInstructor/BecomeInstructor';
import WhyChoseUse from '../WhyChoseUse/WhyChoseUse';
import BestInstructors from './BestInstructors/BestInstructors';
import Footer from '../Footer/Footer';

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <PartnershipMarquee></PartnershipMarquee>
      <FeedbackCarousel></FeedbackCarousel>
      <StatsSection></StatsSection>
      <BecomeInstructor></BecomeInstructor>
      <WhyChoseUse></WhyChoseUse>
      <BestInstructors></BestInstructors>
    </div>
  );
}
