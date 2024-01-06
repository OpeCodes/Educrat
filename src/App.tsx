import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, Home,SignUp,Login } from "./pages";
import { HomeLayout } from "./components";
import "./App.css";

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
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "sign-in",
    element: <Login/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
