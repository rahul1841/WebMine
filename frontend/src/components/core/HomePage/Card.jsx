import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const Card = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${currentCard === cardData?.heading
        ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 border border-solid border-gray-200 rounded-lg"
        : "bg-richblack-800 "
      } text-richblack-25 h-[300px] box-border cursor-pointer`}
      onMouseEnter={() => setCurrentCard(cardData?.heading)}
    >
      <div className=" p-6 flex flex-col gap-3">
        <div className={`${currentCard === cardData?.heading && "text-richblack-800"} font-semibold text-[20px]`}>
          {cardData?.heading}
        </div>

        <div className="text-richblack-400">{cardData?.description}</div>
      </div>
    </div>
  );
};

export default Card;
