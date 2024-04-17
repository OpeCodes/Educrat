import {
  Ads,
  Courses,
  Cta,
  Footer,
  Header,
  Instructors,
  News,
  Recommendations,
  Sponsors,
  // Students,
} from "../constants";

const Home = () => {
  return (
    <>
      <Header />
      <Sponsors />
      <Courses />
      {/* <Categories /> */}
      <Instructors />
      {/* <Students /> */}
      <Cta />
      <Ads />
      <News />
      <Recommendations />
      <Footer />
      
    </>
  );
};

export default Home;
