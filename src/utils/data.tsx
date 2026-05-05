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
    title: "Senior engineer mentors",
    desc: "Learn from people shipping at scale — not theory-only instructors.",
  },
  {
    id: 2,
    img: cta2,
    title: "Project-based tracks",
    desc: "Ship real apps to your portfolio. Every course ends with something real.",
  },
  {
    id: 3,
    img: cta3,
    title: "Self-paced & live cohorts",
    desc: "Move at your own speed, or join a cohort with weekly accountability.",
  },
  {
    id: 4,
    img: cta4,
    title: "Verified certificates",
    desc: "Earn credentials hiring managers actually trust and verify.",
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
    title: "Tracks",
    links: [
      { id: 1, name: "Frontend Engineering" },
      { id: 2, name: "Backend Engineering" },
      { id: 3, name: "Full-Stack" },
      { id: 4, name: "DevOps & Cloud" },
      { id: 5, name: "AI / Machine Learning" },
      { id: 6, name: "Mobile Development" },
      { id: 7, name: "System Design" },
      { id: 8, name: "Data Engineering" },
      { id: 9, name: "Product Engineering" },
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
