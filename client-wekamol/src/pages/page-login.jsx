import { useState } from "react";
import Axios from "../helpers/axios";
import { errorHandler } from "../helpers/errorHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { socket } from "../utils/socket";


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

    //   toast.success(`Login succeeded!`, { //NOT WORKING SOMEHOW
    //     theme: "dark",
    //   });
      navigate("/");
    } catch (error) {
      // console.error(error);
      errorHandler(error);
    }
  }

  function handleNavToRegister(event) {
    navigate("/register");
  }

  useEffect(() => {
    socket.on('new-connection', (payload) => {
      console.log(payload);
    })
  },[socket])

//   async function handleCredentialResponse(response) { //GOOGLE LOGIN LOGIC
//     // console.log("Encoded JWT ID token: " + response.credential);
//     try {
//       const { data } = await Axios.post(
//         "/login/google",
//         {},
//         {
//           headers: {
//             ["google-token"]: response.credential,
//           },
//         }
//       );

//       localStorage.setItem("access_token", data.access_token);
//       toast.success(`Login succeeded with google`, {
//         theme: "dark",
//       });
//       navigate("/");
//     } catch (error) {
//       errorHandler(error);
//     }
//   }

//   useEffect(() => {
//     google.accounts.id.initialize({
//       client_id:
//         "954459036268-ek1eaqqd57mk1at9r09o63466foer3sb.apps.googleusercontent.com",
//       callback: handleCredentialResponse,
//     });
//     google.accounts.id.renderButton(
//       document.getElementById("buttonDiv"),
//       { theme: "outline", size: "large" } // customization attributes
//     );
//   }, []);

  return (
    <>
      <section>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Welcome to Weebify, the anime aficionado's haven in the digital
                cosmos! Dive into a realm adorned with over 20,000 captivating
                anime titles, where every click unveils a gateway to a new
                adventure. Weebify isn't just a recommendation hub; it's an
                immersive playground for both the die-hard fans and the curious
                souls yearning to explore the diverse tapestry of anime
                landscapes. From timeless classics to the latest sensations,
                Weebify is your trusty guide through this vibrant universe,
                ensuring that every visit sparks excitement and leads to your
                next unforgettable anime journey.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    onChange={handleOnChange}
                  />
                  <label className="label">
                    new here?
                    <span>
                      <a
                        onClick={handleNavToRegister}
                        className="label-text-alt link link-hover"
                      >
                        Register Now!
                      </a>
                    </span>
                  </label>
                </div>
                <div className="form-control mt-6 flex justify-center items-center">
                  <button className="btn btn-primary w-full" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
