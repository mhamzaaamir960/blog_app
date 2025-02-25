"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Data {
  identifier: string;
  password: string;
}

function page() {
  const router = useRouter();
  const [data, setData] = useState<Data>({
    identifier: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: Data) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(data);

    try {
      const response = await fetch("./api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // console.log(await response.json());

      if (!response.ok) {
        throw new Error(`Failed to logged In! Status: ${response.status}`);
      }

      setData({ identifier: "", password: "" });
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center">
      <div className="max-w-[500px] w-full h-auto bg-transparent flex flex-col justify-center items-center gap-y-10 text-center">
        <h2 className="font-bold text-black text-[40px]">Login here...</h2>

        <div className="w-full flex flex-col gap-y-5">
          <input
            id="identifier"
            name="identifier"
            type="text"
            value={data.identifier}
            onChange={handleChange}
            placeholder="Email or username*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="font-medium text-white text-[18px] bg-blue-500 hover:bg-opacity-90 rounded-lg px-5 py-2"
        >
          Login
        </button>
        <p className="font-light text-black text-[16px]">
          Don't have an account!{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
