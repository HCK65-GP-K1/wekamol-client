import Axios from "../helpers/axios";

import { errorHandler } from "../helpers/errorHandler";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  let token = localStorage.getItem("access_token");

  const formRef = useRef(null);
  let navigate = useNavigate();
  let [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const doneAdd = (data) => {
    // console.log(data,"AAAAA")
    formRef.current.reset();
    setInput({
      username: "",
      email: "",
      password: "",
    });
    
    navigate("/");
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      let data = await Axios.post("/register", input, {});
      doneAdd(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      <section className="flex justify-center h-screen">
        <h1>INI REGISTER PAGE</h1>
      </section>
    </>
  );
}
