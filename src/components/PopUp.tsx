import React from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

function PopUp({
  setShowPopUp,
}: {
  setShowPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/50 z-50">
      <div className="absolute inset-0 m-auto max-w-[450px] w-full h-[500px] flex flex-col justify-center items-center gap-y-5 bg-white border border-gray-400 drop-shadow-sm rounded-lg p-5">
        <RxCross2
          onClick={() => setShowPopUp(false)}
          className="absolute right-5 top-5 cursor-pointer text-[#555] hover:text-black text-[20px]"
        />
        <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
          <Image
            id="profileImage"
            src={"/next.svg"}
            alt="file Image"
            width={100}
            height={100}
            className="w-[80px] h-[80px] rounded-full border border-blue-500 p-2"
          />
          <label
            htmlFor="profileImage"
            className="cursor-pointer font-light text-[#555] text-[12px]"
          >
            Upload new photo
          </label>
        </div>

        {/* Full Name field */}
        <div className="w-full">
          <label
            htmlFor="fullName"
            className="font-medium text-[#555] text-[16px]"
          >
            Full Name<span className="text-blue-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="w-full h-[30px] p-2 outline-none bg-transparent font-medium text-[#555] text-[14px] border border-gray-400 rounded"
          />
        </div>

        {/* Role field */}
        <div className="w-full">
          <label htmlFor="role" className="font-medium text-[#555] text-[16px]">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            className="w-full h-[30px] p-2 outline-none bg-transparent font-medium text-[#555] text-[14px] border border-gray-400 rounded"
          />
        </div>

        {/* bio field */}
        <div className="w-full">
          <label htmlFor="bio" className="font-medium text-[#555] text-[16px]">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            className="w-full min-h-[90px] max-h-[100px] appearance-none p-2 outline-none bg-transparent font-medium text-[#555] text-[14px] border border-gray-400 rounded "
          />
        </div>

        {/* save button */}
        <button className="w-full h-[30px] bg-blue-500 hover:bg-opacity-90 font-medium text-white text-[18px] drop-shadow rounded ">
          Save
        </button>
      </div>
    </div>
  );
}

export default PopUp;
