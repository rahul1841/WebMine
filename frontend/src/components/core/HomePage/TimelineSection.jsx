import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Customers will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to adapt quickly , efficiently is an essential skill",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Our platform empowers you to overcome scraping challenges",
    },
  ];

  const TimelineSection = () => {
    return (
      <div>
        <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
          <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
            {TimeLine.map((ele, i) => {
              return (
                <div className="flex flex-col lg:gap-3" key={i}>
                  <div className="flex gap-6" key={i}>
                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                      <img src={ele.Logo} alt="" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                      <p className="text-base">{ele.Description}</p>
                    </div>
                  </div>
                  <div
                    className={`hidden ${
                      TimeLine.length - 1 === i ? "hidden" : "lg:block"
                    }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                  ></div>
                </div>
              );
            })}
          </div>
          {/* div2 */}
          <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
{/* Modified div with responsive classes */}
<div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex flex-col lg:flex-row text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 bottom-0 w-full lg:w-auto">
  {/* Section 1 */}
  <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-10">
    <h1 className="text-2xl lg:text-3xl font-bold w-[50px] lg:w-[75px]">4k</h1>
    <h1 className="text-caribbeangreen-300 text-xs lg:text-sm w-[50px] lg:w-[75px]">active users</h1>
  </div>

  {/* Space between div2 and div1 */}
  <div className="w-10 lg:hidden"></div> {/* Adjust width as needed */}

  {/* Section 2 */}
  <div className="flex gap-5 items-center px-7 lg:px-10">
    <h1 className="text-2xl lg:text-3xl font-bold w-[50px] lg:w-[75px]">200+</h1>
    <h1 className="text-caribbeangreen-300 text-xs lg:text-sm w-[50px] lg:w-[75px]">review scraped</h1>
  </div>


            </div>
            <img
              src={TimeLineImage}
              alt="timelineImage"
              className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default TimelineSection;
  