import { createBrowserRouter, redirect } from "react-router-dom";

import RootLayout from "./layouts/rootlayout";
import LoginPage from "./pages/page-login";
import RegisterPage from "./pages/page-register";
import HomePage from "./pages/page-home";
import MyPage from "./pages/page-user";
import FourOFourPage from "./pages/page-404";
import GamePage from "./pages/page-room-game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        throw redirect("/");
      } else {
        return null;
      }
    },
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/game",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <GamePage />,
      },
    ],
  },

  {
    path: "/my",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        return null;
      } else {
        throw redirect("/login");
      }
    },
    children: [
      {
        path: "",
        element: <MyPage />,
      },
    ],
  }, //CHECKED

  {
    path: "/*",
    element: <FourOFourPage />,
  },
]);

export { router };
