import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from './../components/common/motionFrameVarients';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Footer from '../components/common/Footer';
import { FaArrowRight } from 'react-icons/fa';
import logo1 from '../../src/assets/companyLogo/a.png';
import logo2 from '../../src/assets/companyLogo/b.png';
import logo3 from '../../src/assets/companyLogo/c.png';
import logo4 from '../../src/assets/companyLogo/d.png';
import logo5 from '../../src/assets/companyLogo/e.png';
import TimelineSection from "../components/core/HomePage/TimelineSection"
import ExploreSection from "../components/core/HomePage/ExploreSection";
import LastSection from '../components/core/HomePage/LastSection';

function Home() {
  return (
    <React.Fragment>
      <div className="">
        {/*Section1  */}
        <div className="relative  h-auto min-h-[475px] md:min-h-[575px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white pt-8">
          <motion.div
            variants={fadeIn('left', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-center text-3xl lg:text-4xl font-semibold mt-7  "
          >
            Transform data with
            <HighlightText text={'Web Scraping.'} />
          </motion.div>

          <motion.div
            variants={fadeIn('right', 0.1)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="mt-4 w-full sm:w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300 px-4"
          >
            Unlock the power of data with our comprehensive web scraping solutions, designed to revolutionize your information gathering process. Stay ahead of the curve and make informed decisions with our advanced technology at your fingertips.
            <br />
            Experience efficiency like never before.
          </motion.div>

          <div className="flex flex-row gap-7 mt-10">
            <CTAButton active={true} linkto={'/signup'}>
              Register
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
              Scrap Now
            </CTAButton>
          </div>
          <div className="mt-10 w-full sm:w-[90%] text-center text-base lg:text-lg font-bold text-white">
            TRUSTED BY 2,000+ BUSINESSES
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
            <img src={logo1} alt="Logo 1" className="w-20 h-auto sm:w-40" width={160} height={42} loading="lazy" />
            <img src={logo2} alt="Logo 2" className="w-20 h-auto sm:w-40" width={160} height={42} loading="lazy" />
            <img src={logo3} alt="Logo 3" className="w-20 h-auto sm:w-40" width={160} height={42} loading="lazy" />
            <img src={logo4} alt="Logo 4" className="w-20 h-auto sm:w-40" width={160} height={42} loading="lazy" />
            <img src={logo5} alt="Logo 5" className="w-20 h-auto sm:w-40" width={160} height={42} loading="lazy" />
          </div>
        </div>
      </div>

      <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
        {/* Section 2 div */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 ">
          <div className="text-center ">
            <div className="text-3xl lg:text-4xl font-semibold mt-16">
              Why WebMine ?
            </div>
            <div className="text-3xl lg:text-4xl font-semibold mt-8">
              <HighlightText text={'We’re more than just data'} />
            </div>
          </div>

          <div className="mt-5 w-[84%] text-center text-base lg:text-lg font-bold mb-6">
            Accelerate your customer acquisition journey with WebMine, your ultimate data-driven 
            solution. Uncover valuable insights and target prospects with precision using our 
            advanced web scraping technology. Seamlessly integrate data across your sales and 
            marketing teams to streamline operations and drive results. With WebMine, harness 
            the power of automation to scale your outreach efforts and stay ahead of the competition. 
            Revolutionize your approach to lead generation and maximize your business potential with 
            WebMine today.
          </div>
          
          <CTAButton active={true} linkto={'/signup'} className="w-full">
            <div className="text-center">Learn More</div>
          </CTAButton>
        </div>
        
        {/* Timeline Section - Section 2 */}
        <div className='mt-20'>
          <TimelineSection />
        </div>

        {/* What can WebMine Do? Section - Section 2 */}
        <div className='text-3xl lg:text-4xl font-semibold text-center'>
          What can <HighlightText text={"WebMine Do?"} />
        </div>
        <div className='lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%] pl-2 pr-2'>
          WebMine specializes in extracting customer reviews from a wide range of online e-commerce platforms.
        </div>

        {/* Explore Section */}
        <div className='m-20 flex justify-center items-center'>
          <ExploreSection />
        </div>
      </div >

{/* section 3 div */}
<div className='w-full '>
<div className='relative h-auto min-h-[450px] md:min-h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white py-8 '>
         <LastSection />
  </div>
</div>

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
}

export default Home;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { fadeIn } from './../components/common/motionFrameVarients';
// import { Link } from 'react-router-dom';
// import HighlightText from '../components/core/HomePage/HighlightText';
// import CTAButton from '../components/core/HomePage/Button';
// import Footer from '../components/common/Footer';
// import { FaArrowRight } from 'react-icons/fa';
// import logo1 from '../../src/assets/companyLogo/a.png';
// import logo2 from '../../src/assets/companyLogo/b.png';
// import logo3 from '../../src/assets/companyLogo/c.png';
// import logo4 from '../../src/assets/companyLogo/d.png';
// import logo5 from '../../src/assets/companyLogo/e.png';
// import TimelineSection from "../components/core/HomePage/TimelineSection"
// import ExploreSection from "../components/core/HomePage/ExploreSection";
// import LastSection from '../components/core/HomePage/LastSection';

// function Home() {
//   return (
//     <React.Fragment>
//       <div className="">
//         {/*Section1  */}
//         <div className="relative h-auto min-h-[475px] md:min-h-[575px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white pt-8">
//           <motion.div
//             variants={fadeIn('left', 0.1)}
//             initial="hidden"
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.1 }}
//             className="text-center text-3xl lg:text-4xl font-semibold mt-7"
//           >
//             Transform data with
//             <HighlightText text={'Web Scraping.'} />
//           </motion.div>

//           <motion.div
//             variants={fadeIn('right', 0.1)}
//             initial="hidden"
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.1 }}
//             className="mt-4 w-full sm:w-[90%] text-center text-base lg:text-lg font-bold text-richblack-300 px-4"
//           >
//             Unlock the power of data with our comprehensive web scraping solutions, designed to revolutionize your information gathering process. Stay ahead of the curve and make informed decisions with our advanced technology at your fingertips.
//             <br />
//             Experience efficiency like never before.
//           </motion.div>

//           <div className="flex flex-col sm:flex-row gap-7 mt-10">
//             <CTAButton active={true} linkto={'/signup'}>
//               Register
//             </CTAButton>

//             <CTAButton active={false} linkto={'/login'}>
//               Scrap Now
//             </CTAButton>
//           </div>
//           <div className="mt-10 w-full sm:w-[90%] text-center text-base lg:text-lg font-bold text-white">
//             TRUSTED BY 2,000+ BUSINESSES
//           </div>
//           <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
//             <img src={logo1} alt="Logo 1" className="w-20 h-auto sm:w-40" loading="lazy" />
//             <img src={logo2} alt="Logo 2" className="w-20 h-auto sm:w-40" loading="lazy" />
//             <img src={logo3} alt="Logo 3" className="w-20 h-auto sm:w-40" loading="lazy" />
//             <img src={logo4} alt="Logo 4" className="w-20 h-auto sm:w-40" loading="lazy" />
//             <img src={logo5} alt="Logo 5" className="w-20 h-auto sm:w-40" loading="lazy" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white w-full min-h-screen flex flex-col items-center justify-center">
//         {/* Section 2 div */}
//         <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
//           <div className="text-center">
//             <div className="text-3xl lg:text-4xl font-semibold mt-16">
//               Why WebMine?
//             </div>
//             <div className="text-3xl lg:text-4xl font-semibold mt-8">
//               <HighlightText text={'We’re more than just data'} />
//             </div>
//           </div>

//           <div className="mt-5 w-full sm:w-[84%] text-center text-base lg:text-lg font-bold mb-6 px-4">
//             Accelerate your customer acquisition journey with WebMine, your ultimate data-driven 
//             solution. Uncover valuable insights and target prospects with precision using our 
//             advanced web scraping technology. Seamlessly integrate data across your sales and 
//             marketing teams to streamline operations and drive results. With WebMine, harness 
//             the power of automation to scale your outreach efforts and stay ahead of the competition. 
//             Revolutionize your approach to lead generation and maximize your business potential with 
//             WebMine today.
//           </div>
          
//           <CTAButton active={true} linkto={'/signup'} className="w-full sm:w-auto">
//             <div className="text-center">Learn More</div>
//           </CTAButton>
//         </div>
        
//         {/* Timeline Section - Section 2 */}
//         <div className='mt-20 w-full px-4'>
//           <TimelineSection />
//         </div>

//         {/* What can WebMine Do? Section - Section 2 */}
//         <div className='text-3xl lg:text-4xl font-semibold text-center mt-10'>
//           What can <HighlightText text={"WebMine Do?"} />
//         </div>
//         <div className='lg:text-center text-richblack-600 mx-auto text-base font-medium lg:w-[70%] px-4 mt-5'>
//           WebMine specializes in extracting customer reviews from a wide range of online e-commerce platforms.
//         </div>

//         {/* Explore Section */}
//         <div className='my-20 flex justify-center items-center w-full px-4'>
//           <ExploreSection />
//         </div>
//       </div >

//       {/* Section 3 div */}
//       <div className='w-full'>
//         <div className='relative h-auto min-h-[450px] md:min-h-[550px] justify-center mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white py-8'>
//           <LastSection />
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </React.Fragment>
//   );
// }

// export default Home;
