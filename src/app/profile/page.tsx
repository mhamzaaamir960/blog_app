"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/components/utils/getData";
import Image from "next/image";
import img1 from "@/assets/img1.png";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { PiShareFatFill } from "react-icons/pi";
import { PopUp } from "@/components";

function page() {
  const [data, setData]: any = useState();
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData("./api/user/profile");
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="max-w-[1200px] w-full h-full flex flex-col items-center gap-y-20">
        <div className="flex flex-col items-center gap-y-1 mt-32">
          {/* image */}
          <div className="w-[100px] h-[100px] rounded-full bg-transparent border border-blue-500 rounded-full mb-5"></div>

          {/* name */}
          <p className="font-semibold text-black text-[24px]">
            {data?.user.fullName}
          </p>

          {/* role */}
          <p className="font-medium text-[#5c5c5c] text-[18px]">
            Full Stack Developer{" "}
          </p>

          {/* count of likes, followers and posts  */}
          <div className="flex justify-center items-center gap-x-2 my-5">
            {/* likes */}
            <div className="flex flex-col items-center justify-center ">
              <p className="font-medium text-black text-[18px]">50k</p>
              <p className="font-semibold text-blue-500 text-[16px]">Likes</p>
            </div>

            {/* separator */}
            <div className="w-[40px] h-[1px] rotate-90 bg-black" />

            {/* followers */}
            <div className="flex flex-col items-center justify-center ">
              <p className="font-medium text-black text-[18px]">20k</p>
              <p className="font-semibold text-blue-500 text-[16px]">
                Followers
              </p>
            </div>

            {/* separator */}
            <div className="w-[40px] h-[1px] rotate-90 bg-black" />

            {/* posts */}
            <div className="flex flex-col items-center justify-center ">
              <p className="font-medium text-black text-[18px]">12</p>
              <p className="font-semibold text-blue-500 text-[16px]">Posts</p>
            </div>
          </div>

          {/* edit profile button */}
          <button
            onClick={() => setShowPopUp(!showPopUp)}
            className="cursor-pointer hover:underline font-semibold text-[#2a2a2a] text-[16px]"
          >
            Edit Profile
          </button>

          {showPopUp && <PopUp setShowPopUp={setShowPopUp}/>}
          {/* bio */}
          <p className="max-w-[500px] w-full  leading-tight text-center text-[#555] text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ut
            ipsam aliquam alias suscipit veniam incidunt. Id, labore nulla
            culpa, non quo natus minima quam est earum illo architecto animi?
          </p>
        </div>

        <div className="w-full">
          <h2 className="font-medium text-black text-[32px]">My Blog Posts</h2>
          <div className="w-full h-[1px] bg-[#555] mt-2" />
        </div>

        {/* blog posts */}
        {/* <div>No blog posts yet</div> */}

        <div className="w-full mb-20 flex flex-col items-center gap-y-5">
          <div className="max-w-[900px] w-full h-[280px] flex flex-col justify-between bg-white border border-gray-400 rounded-lg drop-shadow-lg p-4 ">
            <div className="flex items-center justify-between">
              <div className="max-w-[65%] w-full flex flex-col justify-start gap-y-2">
                <h3 className="font-semibold leading-tight text-black text-[28px]">
                  Teaching AI to tell visually consistent  stories
                </h3>
                <p className="font-medium leading-tight text-[#555] text-[18px]">
                  We understand stories differently than we understand momentsWe
                  understand stories differently than we understand moments. A
                  moment can be striking or beautiful on its own — a sunset, a
                  dancer’s leap, a smile. a dancer’s leap, a smile....
                </p>
              </div>

              <div>
                <Image
                  src={img1}
                  alt="blog image"
                  width={250}
                  height={200}
                  className="w-[220px] h-[220px]"
                />
              </div>
            </div>
            <div className="flex gap-x-3 px-2">
              <p className="text-[#555] text-[14px]">2d ago.</p>
              <span className="flex items-center justify-center gap-x-1">
                <AiFillLike className="text-[#555] text-[20px]" />
                <p className="text-[#555] text-[14px]">299</p>
              </span>

              <span className="flex items-center justify-center gap-x-1">
                <FaComment className="text-[#555] text-[18px]" />
                <p className="text-[#555] text-[14px]">299</p>
              </span>

              <span className="flex items-center justify-center gap-x-1">
                <PiShareFatFill className="text-[#555] text-[20px]" />
                <p className="text-[#555] text-[14px]">299</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
