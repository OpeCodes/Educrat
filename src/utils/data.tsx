import {
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
  instructor1,
  instructor2,
  instructor3,
  instructor4,
  student1,
  student2,
  student3,
  student4,
  cta1,
  cta2,
  cta3,
  cta4,
  news1,
  news2,
} from "../assets/export";
import { FaStar } from "react-icons/fa6";

export const buttonsData = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Trending",
  },
  {
    id: 3,
    name: "Popular",
  },
  {
    id: 4,
    name: "Featured",
  },
];

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};


export const categoriesData = [
  {
    id: 1,
    img: category1,
    title: "Digital Marketing",
    amount: 573,
  },
  {
    id: 2,
    img: category2,
    title: "Web Development",
    amount: 573,
  },
  {
    id: 3,
    img: category3,
    title: "Graphic Design",
    amount: 573,
  },
  {
    id: 4,
    img: category4,
    title: "Social Sciences",
    amount: 573,
  },
  {
    id: 5,
    img: category5,
    title: "Photography",
    amount: 573,
  },
  {
    id: 6,
    img: category6,
    title: "Art & Humanities",
    amount: 573,
  },
  {
    id: 7,
    img: category7,
    title: "Personal Development",
    amount: 573,
  },
  {
    id: 8,
    img: category8,
    title: "IT and Software",
    amount: 573,
  },
];

export const instructorsData = [
  {
    id: 1,
    img: instructor1,
    name: "Flyod Miles",
    job: "President of Sales",
    icon: <FaStar size={11} />,
    course: 15,
    student: 692,
  },
  {
    id: 2,
    img: instructor2,
    name: "Cameron Williamson",
    job: "Web Designer",
    icon: <FaStar size={11} />,
    course: 15,
    student: 692,
  },
  {
    id: 3,
    img: instructor3,
    name: "Brooklyn Simmons",
    job: "Dog Trainer",
    icon: <FaStar size={11} />,
    course: 15,
    student: 692,
  },
  {
    id: 4,
    img: instructor4,
    name: "Wade Warren",
    job: "Marketing Coordinator",
    icon: <FaStar size={11} />,
    course: 15,
    student: 692,
  },
];

export const studentsData = [
  {
    id: 1,
    img: student1,
    name: "Brooklyn Simmons",
    job: "Web Designer",
  },
  {
    id: 2,
    img: student2,
    name: "Cody Fisher",
    job: "Dog Trainer",
  },
  {
    id: 3,
    img: student3,
    name: "Marvin McKinney",
    job: "President of Sales",
  },
  {
    id: 4,
    img: student4,
    name: "Jane Cooper",
    job: "Marketing Coordinator",
  },
];

export const ctaData = [
  {
    id: 1,
    img: cta1,
    title: "Learn with Experts",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
  {
    id: 2,
    img: cta2,
    title: "Learn Anything",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
  {
    id: 3,
    img: cta3,
    title: "Flexible Learning",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
  {
    id: 4,
    img: cta4,
    title: "Industrial Standard",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
];

export const newsData = [
  {
    id: 1,
    img: news1,
    category: "Education",
    title: "Eco-Education in Our Lives: We Can Change the Future",
    date: "January 16, 2024",
  },
  {
    id: 2,
    img: news2,
    category: "Design",
    title: "How to design a simple, yet unique and memorable brand identity",
    date: "January 16, 2024",
  },
];

export const footerLinksData = [
  {
    id: 1,
    title: "About",
    links: [
      {
        id: 1,
        name: "About Us",
      },
      {
        id: 2,
        name: "Learner Stories",
      },
      {
        id: 3,
        name: "Careers",
      },
      {
        id: 4,
        name: "Press",
      },
      {
        id: 5,
        name: "Leadership",
      },
      {
        id: 6,
        name: "Contact Us",
      },
    ],
  },
  {
    id: 2,
    title: "Categories",
    links: [
      {
        id: 1,
        name: "Development",
      },
      {
        id: 2,
        name: "Business",
      },
      {
        id: 3,
        name: "Finance & Accounting",
      },
      {
        id: 4,
        name: "IT & Software",
      },
      {
        id: 5,
        name: "Office Productivity",
      },
      {
        id: 6,
        name: "Design",
      },
      {
        id: 7,
        name: "Marketing",
      },
      {
        id: 8,
        name: "Lifestyle",
      },
      {
        id: 9,
        name: "Photography & Video",
      },
      {
        id: 10,
        name: "Health & Fitness",
      },
      {
        id: 11,
        name: "Music",
      },
      {
        id: 12,
        name: "UX Design",
      },
      {
        id: 13,
        name: "Seo Optimization",
      },
    ],
  },
  {
    id: 3,
    title: "Support",
    links: [
      {
        id: 1,
        name: "Documentation",
      },
      {
        id: 2,
        name: "FAQ'S",
      },
      {
        id: 3,
        name: "Dashboard",
      },
      {
        id: 4,
        name: "Contact",
      },
    ],
  },
];
