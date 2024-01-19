import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import {
  Error,
  SignUp,
  Login,
  ForgotPassword,
  VerifyAccount,
  ResetPassword,
} from "./pages/auth";
import {
  CourseManageDashboardLayout,
  HomeLayout,
  InstructorDashboardLayout,
} from "./components";
import "./App.css";
import Home from "./pages/Home";
import { StudentCourse } from "./pages/course";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import BecomeInstructor from "./pages/instructor/BecomeInstructor";
import { Courses, CreateCourse } from "./pages/instructor/courses";
import { CourseLandingPage } from "./pages/instructor/courses/managecourse";
import Curriculum from "./pages/instructor/courses/managecourse/Curriculum";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { jwtDecode } from "jwt-decode";
import { removeUserFromLocalStorage } from "./store/localStorage";
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
    element: <BecomeInstructor />,
  },

  {
    path: "/course/create/1",
    element: <CreateCourse />,
  },
  //instructor dashboard
  {
    path: "/instructor",
    element: <InstructorDashboardLayout />,
    children: [
      {
        path: "courses",
        element: <Courses />,
      },
    ],
  },
  {
    path: "/instructor/courses/:id/manage/",
    element: <CourseManageDashboardLayout />,
    children: [
      {
        path: "basics",
        element: <CourseLandingPage />,
      },
      {
        path: "curriculum",
        element: <Curriculum />,
      },
    ],
  },
]);


function App() {

  const { user } = useSelector((store: RootState) => store.user);
  if (user?.accessToken) {
    const token = `${user.accessToken}`;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp !== undefined && decodedToken.exp < currentTime) {
       return redirect("/sign-in")

        removeUserFromLocalStorage();
      } else {
        // console.log("JWT is still valid");
      }
    } catch (error) {
      // console.error("Error decoding JWT:", error);
    }
  }
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
