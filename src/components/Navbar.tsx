"use client";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="fixed w-full h-[80px] bg-gray-200 flex justify-center items-center z-20">
      <div className="max-w-[1200px] w-full h-full flex justify-between items-center px-5">
        <Link href={"/"} className="font-black text-black text-[30px]">Logo</Link>
        <div className="flex justify-center items-center gap-5">
          <Link href={"/new-blog"} className="bg-blue-500 hover:bg-opacity-90 cursor-pointer flex justify-center items-center gap-2 px-2 py-1 rounded-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 4C14.1326 4 14.2598 3.94732 14.3536 3.85355C14.4473 3.75979 14.5 3.63261 14.5 3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3V4ZM21 10C21 9.86739 20.9473 9.74021 20.8536 9.64645C20.7598 9.55268 20.6326 9.5 20.5 9.5C20.3674 9.5 20.2402 9.55268 20.1464 9.64645C20.0527 9.74021 20 9.86739 20 10H21ZM14 3H4V4H14V3ZM3 4V20H4V4H3ZM4 21H20V20H4V21ZM21 20V10H20V20H21ZM20 21C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20H20V21ZM3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21V20H3ZM4 3C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4H4V3Z"
                fill="white"
              />
              <path
                d="M17.5002 4.49999L9.04222 12.958C9.01489 12.9856 8.99434 13.0191 8.98222 13.056L8.15822 15.526C8.14362 15.57 8.14155 15.6172 8.15224 15.6623C8.16292 15.7074 8.18594 15.7487 8.21873 15.7815C8.25152 15.8143 8.29278 15.8373 8.33789 15.848C8.38301 15.8587 8.43021 15.8566 8.47422 15.842L10.9442 15.019C10.9811 15.0069 11.0147 14.9863 11.0422 14.959L19.5002 6.49999M17.5002 4.49999L19.8232 2.17699C19.8464 2.15371 19.874 2.13524 19.9044 2.12264C19.9348 2.11003 19.9673 2.10355 20.0002 2.10355C20.0331 2.10355 20.0657 2.11003 20.096 2.12264C20.1264 2.13524 20.154 2.15371 20.1772 2.17699L21.8232 3.82299C21.8465 3.84622 21.865 3.8738 21.8776 3.90418C21.8902 3.93455 21.8967 3.96711 21.8967 3.99999C21.8967 4.03288 21.8902 4.06544 21.8776 4.09581C21.865 4.12618 21.8465 4.15377 21.8232 4.17699L19.5002 6.49999M17.5002 4.49999L19.5002 6.49999"
                stroke="white"
              />
            </svg>
            <button className="text-white text-[14px]">Write a blog...</button>
          </Link >

          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer w-[50px] h-[50px] rounded-full bg-transparent flex justify-center items-center border border-blue-500"
          ></div>

          {showMenu && (
            <div className="absolute top-24 w-[160px] h-[100px] flex flex-col justify-center items-center gap-y-2 bg-gray-200 border border-[#a7a7a7] rounded-lg drop-shadow-lg p-4">
              <Link
                href={"/profile"}
                className="w-full text-start text-black font-medium text-[16px] px-1"
              >
                Profile
              </Link>
              <div className="w-full h-[1px] bg-black" />
              <button
                className="w-full text-start text-black font-medium text-[16px] px-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
