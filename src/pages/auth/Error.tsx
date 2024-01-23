import {Link ,useRouteError} from "react-router-dom"
const Error = () => {
  const error: any  = useRouteError()
 console.log(error)
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
}

export default Error