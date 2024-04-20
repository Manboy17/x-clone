"use client";

import "../../globals.css";
import { Button } from "@/components/ui/button";
import { RefreshCcw, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!isValidEmail) {
      setError("Invalid email address");
      return;
    }

    if (!name || !username || !email) {
      setError("Please fill all fields");
    }

    if (!password || password.length < 6) {
      setError("Password too short");
      return;
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (res.status == 400) {
        setError("Email already exists");
      }

      if (res.status == 200) {
        setError("");
        router.replace("/login");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCcw className="animate-spin h-12 w-12 text-gray-600" />
      </div>
    );
  }

  return (
    status !== "authenticated" && (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-black/50">
        <form
          className="relative p-[50px] shadow-md bg-white dark:bg-black/50 rounded-md flex flex-col gap-y-5 dark:border dark:border-gray-600"
          onSubmit={handleSubmit}
        >
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => router.replace("/")}
          >
            <X />
          </div>
          <h3 className="text-center text-lg font-semibold">Welcome to X</h3>
          <h2 className="text-sm">Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Name..."
            className="min-w-[300px] outline-none border border-gray-400 dark:bg-stone-600 rounded-sm px-2 py-1.5"
          />
          <input
            type="text"
            name="username"
            placeholder="Username..."
            className="min-w-[300px] outline-none border border-gray-400 dark:bg-stone-600 rounded-sm px-2 py-1.5"
          />
          <input
            type="email"
            name="email"
            placeholder="Email..."
            className="min-w-[300px] outline-none border border-gray-400 dark:bg-stone-600 rounded-sm px-2 py-1.5"
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            className="min-w-[300px] outline-none border border-gray-400 dark:bg-stone-600 rounded-sm px-2 py-1.5"
          />
          <Button variant="default" className="dark:bg-blue-500">
            Register
          </Button>
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline transition"
            >
              Login
            </Link>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    )
  );
};

export default page;
