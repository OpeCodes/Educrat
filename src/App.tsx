import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Error,
  SignUp,
  Login,
  ForgotPassword ,
  VerifyAccount,
  ResetPassword,
} from "./pages/auth";
import { HomeLayout, InstructorDashboardLayout } from "./components";
import "./App.css";
import Home from "./pages/Home";
import { StudentCourse } from "./pages/course";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import BecomeInstructor from "./pages/instructor/BecomeInstructor";
import { Courses, CreateCourse } from "./pages/instructor/courses";
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
        element: <StudentCourse />,
      },
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
  {
    path: "reset-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-account/:code/:token",
    element: <VerifyAccount />,
  },
  {
    path: "/reset-password/:code/:token",
    element: <ResetPassword />,
  },
  //instructor
  {
    path: "/become-instructor",
    element : <BecomeInstructor/>
  },
  //instructor dashboard
  {
    path: "/instructor",
    element: <InstructorDashboardLayout/>,
    children: [
      {
        path: "courses",
        element: <Courses/>
      }
    ]
  },
  {
    path: "/course/create/1",
    element: <CreateCourse/>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
