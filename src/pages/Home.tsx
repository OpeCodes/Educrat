import {
  Categories,
  Courses,
  Cta,
  Header,
  Instructors,
  Sponsors,
  Students,
} from "../constants";

const Home = () => {
  return (
    <>
      <Header />
      <Sponsors />
      <Courses />
      <Categories />
      <Instructors />
      <Students />
      <Cta />
    </>
  );
};

export default Home;
