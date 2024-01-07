import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, SignUp, Login } from "./pages/auth";
import { HomeLayout } from "./components";
import "./App.css";
import Home from "./pages/Home";
import { Courses } from "./pages/course";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses/>
      }
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "sign-in",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
