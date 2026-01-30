
import { SkillCategory, Project, Experience } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "fa-code",
    skills: [
      { name: "HTML5", icon: "fa-brands fa-html5", level: "Expert", proficiency: 95 },
      { name: "CSS3", icon: "fa-brands fa-css3-alt", level: "Expert", proficiency: 90 },
      { name: "JavaScript", icon: "fa-brands fa-js", level: "Expert", proficiency: 92 },
      { name: "TypeScript", icon: "fa-solid fa-code", level: "Advanced", proficiency: 85 },
      { name: "React.js", icon: "fa-brands fa-react", level: "Expert", proficiency: 94 },
      { name: "Next.js", icon: "fa-solid fa-bolt", level: "Advanced", proficiency: 80 },
      { name: "Tailwind CSS", icon: "fa-solid fa-wind", level: "Expert", proficiency: 95 },
      { name: "Material UI", icon: "fa-solid fa-palette", level: "Advanced", proficiency: 85 }
    ]
  },
  {
    title: "Backend Development",
    icon: "fa-server",
    skills: [
      { name: "Node.js", icon: "fa-brands fa-node-js", level: "Advanced", proficiency: 88 },
      { name: "Express.js", icon: "fa-solid fa-link", level: "Advanced", proficiency: 85 },
      { name: "PHP", icon: "fa-brands fa-php", level: "Expert", proficiency: 90 },
      { name: "Laravel", icon: "fa-brands fa-laravel", level: "Expert", proficiency: 88 },
      { name: "REST API", icon: "fa-solid fa-cloud", level: "Expert", proficiency: 95 },
      { name: "GraphQL", icon: "fa-solid fa-diagram-project", level: "Intermediate", proficiency: 65 }
    ]
  },
  {
    title: "Databases",
    icon: "fa-database",
    skills: [
      { name: "MongoDB", icon: "fa-solid fa-leaf", level: "Advanced", proficiency: 85 },
      { name: "MySQL", icon: "fa-solid fa-database", level: "Advanced", proficiency: 88 },
      { name: "PostgreSQL", icon: "fa-solid fa-table", level: "Intermediate", proficiency: 70 }
    ]
  },
  {
    title: "CMS & E-Commerce",
    icon: "fa-cart-shopping",
    skills: [
      { name: "WordPress", icon: "fa-brands fa-wordpress", level: "Expert", proficiency: 95 },
      { name: "Shopify", icon: "fa-brands fa-shopify", level: "Advanced", proficiency: 80 },
      { name: "WooCommerce", icon: "fa-solid fa-bag-shopping", level: "Advanced", proficiency: 85 },
      { name: "Strapi", icon: "fa-solid fa-sitemap", level: "Intermediate", proficiency: 60 }
    ]
  },
  {
    title: "Tools & Technologies",
    icon: "fa-wrench",
    skills: [
      { name: "Git & GitHub", icon: "fa-brands fa-github", level: "Expert", proficiency: 92 },
      { name: "VS Code", icon: "fa-solid fa-file-code", level: "Expert", proficiency: 98 },
      { name: "Postman", icon: "fa-solid fa-envelope-open-text", level: "Advanced", proficiency: 90 },
      { name: "Figma", icon: "fa-brands fa-figma", level: "Advanced", proficiency: 82 },
      { name: "AWS", icon: "fa-brands fa-aws", level: "Intermediate", proficiency: 60 },
      { name: "Docker", icon: "fa-brands fa-docker", level: "Intermediate", proficiency: 55 }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "FutureTech Solutions",
    period: "Mar 2024 - Present",
    description: "Leading the development of complex enterprise web applications. Architecture design, frontend optimization, and backend microservices management.",
    skills: ["React", "Node.js", "AWS", "MongoDB"]
  },
  {
    role: "Web Developer",
    company: "Digital Dynamics",
    period: "Jan 2023 - Feb 2024",
    description: "Built and maintained multiple client projects including e-commerce sites and custom CRM dashboards using Laravel and Vue.js.",
    skills: ["Laravel", "PHP", "MySQL", "JavaScript"]
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "May 2022 - Dec 2022",
    description: "Delivered 10+ custom websites for local businesses, focusing on performance, SEO, and responsive design using WordPress and React.",
    skills: ["WordPress", "HTML/CSS", "React"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Jewelry E-Commerce",
    description: "Premium jewelry store with payment integration and custom cart management.",
    image: "https://picsum.photos/seed/jewel/800/500",
    tags: ["React", "Node.js", "Tailwind", "E-Commerce"],
    category: ["React", "Node.js", "E-Commerce", "Payment Gateway"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 2,
    title: "Unity Heart Healthcare",
    description: "Comprehensive patient management platform with appointment scheduling.",
    image: "https://picsum.photos/seed/health/800/500",
    tags: ["Next.js", "PostgreSQL", "Healthcare"],
    category: ["Next.js", "Healthcare", "API"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 3,
    title: "Pharmacy Management",
    description: "Inventory tracking system with low-stock alerts and sales reporting.",
    image: "https://picsum.photos/seed/pharmacy/800/500",
    tags: ["PHP", "Laravel", "MySQL"],
    category: ["PHP", "Laravel", "MySQL", "Healthcare"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 4,
    title: "Elite School System",
    description: "ERP for schools to manage student data, fees, and examination results.",
    image: "https://picsum.photos/seed/school/800/500",
    tags: ["React", "MongoDB", "Education"],
    category: ["React", "MongoDB", "School Management"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 5,
    title: "Real Estate Portal",
    description: "Property listing platform with advanced search and geolocation features.",
    image: "https://picsum.photos/seed/estate/800/500",
    tags: ["React", "Next.js", "API"],
    category: ["React", "Next.js", "Real Estate", "API Integration"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 6,
    title: "Global Shopify Store",
    description: "High-performance Shopify storefront with custom Liquid templates.",
    image: "https://picsum.photos/seed/store/800/500",
    tags: ["Shopify", "Liquid", "E-Commerce"],
    category: ["Shopify", "E-Commerce", "Online Store"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 7,
    title: "Dental Clinic App",
    description: "Appointment booking and patient record system for dental practices.",
    image: "https://picsum.photos/seed/dental/800/500",
    tags: ["Next.js", "Appointment System"],
    category: ["Next.js", "Healthcare", "Appointment System"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 8,
    title: "Corporate CMS Website",
    description: "Custom WordPress site for a multinational corporate brand.",
    image: "https://picsum.photos/seed/corp/800/500",
    tags: ["WordPress", "PHP", "CMS"],
    category: ["WordPress", "PHP", "CMS"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 9,
    title: "Payment Integration Kit",
    description: "Reusable API bridge for multiple payment gateway integrations.",
    image: "https://picsum.photos/seed/pay/800/500",
    tags: ["Node.js", "Express", "API"],
    category: ["Node.js", "API", "Payment Gateway"],
    liveUrl: "#",
    repoUrl: "#"
  },
  {
    id: 10,
    title: "Jewelry Auction Pro",
    description: "Real-time bidding platform for luxury items.",
    image: "https://picsum.photos/seed/auction/800/500",
    tags: ["React", "Node.js", "MySQL"],
    category: ["React", "Node.js", "MySQL", "Jewelry"],
    liveUrl: "#",
    repoUrl: "#"
  }
];

export const FILTERS = [
  "All", "React", "Next.js", "Node.js", "PHP", "Laravel", "MySQL", 
  "MongoDB", "API", "Healthcare", "E-Commerce", "CMS", "Shopify", 
  "Payment Gateway", "School Management", "Real Estate", "Jewelry"
];
