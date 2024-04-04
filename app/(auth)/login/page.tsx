"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!isValidEmail) {
      setError("Invalid email address");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password too short");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(res);
      if (res?.error) {
        setError("Invalid credentials");
        if (res?.url) router.replace("/");
      } else {
        setError("");
      }
    } catch (error: any) {
      console.log("Error: ", error.message);
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
          className="p-[50px] shadow-md bg-white rounded-md flex flex-col gap-y-5"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center text-lg font-semibold">Welcome back</h3>
          <h2 className="text-sm">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            className="min-w-[300px] outline-none border border-gray-400 rounded-sm px-2 py-1.5"
          />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            className="min-w-[300px] outline-none border border-gray-400 rounded-sm px-2 py-1.5"
          />
          <Button variant="default" role="submit">
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline transition"
            >
              Register
            </Link>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    )
  );
};

export default Login;
