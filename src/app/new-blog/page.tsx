import React from "react";
import { IoCloudUpload, IoChevronUp } from "react-icons/io5";

function page() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 z-0">
      <div className="max-w-[800px] w-full flex flex-col items-center gap-y-5 mb-5">
        {/* upload image */}
        <div className="cursor-pointer w-full h-[150px] flex flex-col justify-center items-center bg-[#FDFDFD] mt-32 border border-gray-400 drop-shadow-lg rounded-lg">
          <IoCloudUpload className="text-[50px] text-blue-500" />
          <p className="font-medium text-[#555] text-[20px]">Browse Image</p>
        </div>

        {/* title field */}
        <input
          type="text"
          placeholder="Enter your blog title..."
          className="w-full outline-none bg-transparent font-medium text-[#555] text-[24px] border-b border-gray-400 mt-10"
        />

        {/* category options */}
        <div className="w-full flex justify-between items-center pr-4 my-3">
          <select
            name="category"
            id="category"
            className="w-full flex outline-none bg-transparent appearance-none px-5"
          >
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="finance">Finance</option>
          </select>
          <IoChevronUp className="w-[20px] h-[20px] " />
        </div>

        {/* description field */}
        <textarea
          name="description"
          id="description"
          placeholder="blog description..."
          className="outline-none w-full min-h-[500px] font-medium text-[#555] text-[18px] bg-transparent drop-shadow-xl shadow-lg rounded-lg p-5 border border-blue-500"
        />
        {/* publish button */}
        <button className="w-fit self-end font-semibold text-white text-[16px] bg-blue-500 hover:bg-opacity-90 px-4 py-2 rounded-lg">
          Publish
        </button>
      </div>
    </div>
  );
}

export default page;
