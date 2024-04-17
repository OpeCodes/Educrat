import { Flex } from "@chakra-ui/react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error: any = useRouteError();

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
    <Flex columnGap={2}>
      <h3>
        OOps! Something is broken
        {/* <a style={{color: "blue"}} href="mailto:adedokunpeter11@gmail.com">adedokunpeter11@gmail.com</a>{" "} */}
      </h3>
      <a
        style={{ color: "blue" }}
        href="mailto:adedokunpeter11@gmail.com?subject=Website%20Issue%20Report&body=Good%20day,%0A%0ASomething%20on%20your%20website%20appears%20to%20be%20broken.%20I%20wanted%20to%20bring%20this%20to%20your%20attention%20so%20it%20can%20be%20addressed%20appropriately.%0A%0APlease%20let%20me%20know%20if%20you%20need%20further%20information%20or%20assistance.%0A%0AThank%20you.%0A"
      >
        Click to Report Website Issue
      </a>
    </Flex>
  );
};

export default Error;
