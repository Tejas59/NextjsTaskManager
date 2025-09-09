"use client";
import { useState, type FormEvent } from "react";
import Loader from "./Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      setIsLoading(false);
      return;
    }
    console.log({ email, name });
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center bg-blue-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="ml-2 px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-colors"
          >
            {isLoading ? <Loader /> : "Register"}
          </button>

          <p className="text-center text-sm mt-2">Already have an account?</p>
          <Link
            href="/"
            className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
