import {
  cta1,
  cta2,
  cta3,
  cta4,
  news1,
  news2,
} from "../assets/export";
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
