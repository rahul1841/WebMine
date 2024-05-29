import React from 'react'
import LastSecImg from '../../../assets/Images/zx.jpg'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';


import { motion } from 'framer-motion'
import { scaleUp } from './../../common/motionFrameVarients';


const LastSection = () => {
  return (
    <div>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

        <motion.div
          variants={scaleUp}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] '>
          {/* Apply max-width and max-height to control image size */}
          <Img
            src={LastSecImg}
            alt="LastSecImg"
            className='shadow-white rounded-3xl max-w-full max-h-[400px] object-cover object-center'
          />
        </motion.div>

        <div className='lg:w-[50%] flex flex-col'>
          <div className='text-3xl lg:text-4xl font-semibold mb-2'>
            Ready to 
            <HighlightText text={"Scrape?"} />
          </div>
      {/* Empty div for space */}
      <div style={{ height: "20px" }}></div>
          <p className='font-medium text-[16px] w-[80%] text-richblack-300 mb-12'>
          Unearth the web's treasures with our premier scraping services, unlocking valuable insights and data-driven solutions through advanced web scraping technology.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Scraping Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LastSection;
