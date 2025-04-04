"use client";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/schemas";
import { useRouter } from "next/navigation";
import { UserArgs } from "@prisma/client/runtime/library";

function page() {
  const router = useRouter();
  const fileRef = useRef<any | null>(null);
  const [data, setData] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: undefined,
  });
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;
    setData((prevData: User) => ({ ...prevData, profilePicture: file }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData: User) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(data);

    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   if (!value) return;
    //   if (value instanceof File) {
    //     formData.append(key, value, value.name);
    //   } else if (typeof value === "object") {
    //     formData.append(key, JSON.stringify(value));
    //   } else {
    //     formData.append(key, value);
    //   }
    // });
    // console.log(formData.get("profilePicture"))

    try {
      const response = await fetch("./api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(await response.json());
      if (!response.ok) {
        throw new Error(`Failed to post data! Status: ${response.status}`);
      }

      setData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/login");
    } catch (error: unknown) {
      console.log(`Error: ${error}`);
      setError(error as string);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-white flex justify-center items-center">
      <div className="max-w-[600px] w-full h-auto bg-transparent flex flex-col justify-center items-center gap-y-10 text-center">
        <h2 className="font-bold text-black text-[40px]">SignUp here...</h2>

        <div
          onClick={() => fileRef.current.click()}
          className="flex flex-col items-center justify-center gap-y-5 "
        >
          <Image
            id="profilePicture"
            src={"/next.svg"}
            alt="Profile Picture"
            width={130}
            height={130}
            className="w-[130px] h-[130px] border border-blue-500 bg-gray-200 p-2 rounded-full"
          />
          <label
            htmlFor="profilePicture"
            className="font-medium text-[#555] text-[20px]"
          >
            Upload Profile Picture
          </label>
          <input
            ref={fileRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="flex gap-x-5">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required={true}
              value={data.firstName}
              onChange={handleChange}
              placeholder="First Name*"
              className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
            />
          </div>
          <input
            id="username"
            name="username"
            type="text"
            required={true}
            value={data.username}
            onChange={handleChange}
            placeholder="Username*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
          <input
            id="email"
            name="email"
            type="email"
            required={true}
            value={data.email}
            onChange={handleChange}
            placeholder="Email*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
          <input
            id="password"
            name="password"
            type="password"
            required={true}
            value={data.password}
            onChange={handleChange}
            placeholder="Password*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required={true}
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password*"
            className="outline-none w-full h-[50px] text-[#555555] text-[18px] bg-[#FDFEFF] border border-blue-500 rounded-[8px] drop-shadow-xl px-3 "
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="font-medium text-white text-[18px] bg-blue-500 hover:bg-opacity-90 rounded-lg px-5 py-2"
        >
          SignUp
        </button>
        <p className="font-light text-black text-[16px]">
          Already have an account!{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
