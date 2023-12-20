import { useState } from "react";
import Axios from "../helpers/axios";
import { errorHandler } from "../helpers/errorHandler";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function LoginPage() {
  let navigate = useNavigate("");
  const [form, setForm] = useState({
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

  // console.log(form)

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await Axios.post("/users/login", form);
      localStorage.setItem("access_token", data.access_token);

      toast.success('Login success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      navigate("/");
    } catch (error) {
      // console.error(error);
      errorHandler(error);
    }
  }

  return (
    <>
    <ToastContainer />
      {/* component */}
      <div className="w-full min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-black">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-12 text-center w-full text-4xl font-extrabold text-slate-200">Log into your account</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-slate-200" htmlFor="email">
                Email-Address
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleOnChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-slate-200" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleOnChange}
                className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
              />
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-outline btn-success w-full">Login</button>
            </div>
            <div className="mt-6 text-center">
              <Link to="/register" className="hover:underline text-slate-200">
                Sign up for an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}
