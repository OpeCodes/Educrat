import { useToast } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const error: any = useRouteError();
  console.log(error);
  toast({
    title: `redirecting to to previous page... `,
    status: "info",
    duration: 3000,
    isClosable: true,
  });
  setTimeout(() => {
    navigate(-1);
  }, 3000);
  if (error?.status === 404) {
    return (
      <div>
        {/* <img src={img} alt="not found" /> */}
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    );
  }
  return (
    <div>
      <h3>something went wrong contact adedokunpeter11@gmail.com</h3>
    </div>
  );
};

export default Error;
