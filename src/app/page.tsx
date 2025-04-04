"use client";
import Image from "next/image";
import Link from "next/link";
import { getData } from "@/components/utils/getData";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [data, setData]: any = useState();

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

  // console.log(data);

  const handleLogout = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("./api/user/logout");
      if (!response.ok) {
        throw new Error(
          `Filed to Logout! Try Again! Status: ${response.status}`
        );
      }

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data && <h1 className="">{data?.user.fullName}</h1>}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}

       

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/signup"
          >
            Singn Up
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            LogOut
          </button>
        </div>
      </main>
    </div>
  );
}
