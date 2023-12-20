import Axios from "../helpers/axios";

import { errorHandler } from "../helpers/errorHandler";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("/users/register", form);
        navigate('/login')
      } catch (error) {
        errorHandler(error);
      }
    }

  return (
      <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-dark rounded-md shadow-xl lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-white-800 uppercase">
              Create a new User
            </h1>
            <form className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-white-800"
                >
                  Username
                </label>
                <input
                  type="username"
                  placeholder="Enter Your Username"
                  autoComplete="yes"
                  name="username"
                  onChange={handleOnChange}
                  className="block w-full px-4 py-2 mt-2 text-white-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  autoComplete="yes"
                  onChange={handleOnChange}
                  name="email"
                  className="block w-full px-4 py-2 mt-2 text-white-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  autoComplete="yes"
                  onChange={handleOnChange}
                  name="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="form-control mt-6 flex justify-center items-center">
                  <button className="btn btn-outline btn-success w-full" type="submit" onClick={handleSubmit}>
                    Register
                  </button>
                </div>
            </form>
          </div>
        </div>
      </>
    );
  }










