"use client";
import React, { ChangeEvent, useState } from "react";
import { Post } from "@/schemas";
import { IoCloudUpload, IoChevronUp } from "react-icons/io5";

function page() {
  const [data, setData] = useState<Post>({
    title: "",
    category: "Technology",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev: Post) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Faild to create post!");
      }
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          type="text"
          required={true}
          placeholder="Enter your blog title..."
          className="w-full outline-none bg-transparent font-medium text-[#555] text-[24px] border-b border-gray-400 mt-10"
        />

        {/* category options */}
        <div className="w-full flex justify-between items-center pr-4 my-3">
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleChange}
            required={true}
            className="w-full flex outline-none bg-transparent appearance-none px-5"
          >
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Finance">Finance</option>
          </select>
          <IoChevronUp className="w-[20px] h-[20px] " />
        </div>

        {/* description field */}
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          required={true}
          placeholder="blog description..."
          className="outline-none w-full min-h-[500px] font-medium text-[#555] text-[18px] bg-transparent drop-shadow-xl shadow-lg rounded-lg p-5 border border-blue-500"
        />
        {/* publish button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-fit self-end font-semibold text-white text-[16px] bg-blue-500 hover:bg-opacity-90 px-4 py-2 rounded-lg"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default page;
