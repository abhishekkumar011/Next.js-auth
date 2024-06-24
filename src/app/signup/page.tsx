"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);

      toast.success("Signup successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 text-black">
      <div className="px-20 py-10 shadow-lg bg-white border border-slate-300 border-r-4 rounded-lg flex flex-col">
        <div className="w-full flex justify-center mb-5">
          <Image src={"/logo.png"} height={34} width={34} alt={"logo"} />
        </div>
        <h1 className="text-center mb-2">
          {loading ? "Processing" : "Signup"}
        </h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="mt-4">
              Username
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              type="text"
            />
          </div>

          <button
            onClick={onSignup}
            className="border p-2 rounded-md bg-green-700 text-white"
          >
            {buttonDisabled ? "Please fill the form" : "Signup"}
          </button>

          <Link className="text-center text-green-700" href={"/login"}>
            Visit login page
          </Link>
        </div>
      </div>
    </div>
  );
}
