import { createBrowserRouter, RouterProvider , } from "react-router-dom";
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
import Home from "./pages/Home";
import {
  AllInstructorPage,
  MyLearning,
  SingleCourse,
  SingleEnrolledCourse,
  StudentCourse,
} from "./pages/studentCourse";
import BecomeInstructor from "./pages/instructor/BecomeInstructor";
import { Courses, CreateCourse } from "./pages/instructor/courses";
import {
  CourseLandingPage,
  CourseMessage,
  CourseSettings,
  Pricing,
  Withdrawal,
} from "./pages/instructor/courses/managecourse";
import Curriculum from "./pages/instructor/courses/managecourse/Curriculum";
import SingleInstructorPage from "./pages/studentCourse/SingleInstructorPage";
import Cart from "./pages/Cart";
import PaymentConfirmationPage from "./pages/studentCourse/PaymentConfirmationPage";
import Checkout from "./pages/Checkout";
import SingleCheckoutPage from "./pages/SingleCheckoutPage";

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
        path: "/all-courses",
        element: <StudentCourse />,
      },
      {
        path: "/course/:slug",
        element: <SingleCourse />,
      },
      {
        path: "/home/my-courses/learning/",
        element: <MyLearning />,
      },
      {
        path: "/user/:slug",
        element: <SingleInstructorPage />,
      },
      {
        path: "all-instructor",
        element: <AllInstructorPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment/checkout",
        element: <Checkout />,
      },{
        path: "/payment/checkout/express/:id",
        element: <SingleCheckoutPage/>
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
  {
    path: "/course/:slug/learn/lecture/:id/:lectureId/reviews",
    element: <SingleEnrolledCourse />,
  },
  {
    path: "/payment/:tx_ref",
    element: <PaymentConfirmationPage />,
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
    errorElement: <Error />,

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
    errorElement: <Error />,
    children: [
      {
        path: "basics",
        element: <CourseLandingPage />,
      },
      {
        path: "curriculum",
        element: <Curriculum />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "communications/messages",
        element: <CourseMessage />,
      },
      {
        path: "settings",
        element: <CourseSettings />,
      },
      {
        path: "withdrawal",
        element: <Withdrawal />,
      },      
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
