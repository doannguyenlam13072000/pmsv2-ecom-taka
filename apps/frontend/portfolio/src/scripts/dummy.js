export const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#features", label: "About me" },
    { href: "#skills", label: "Skills" },
    { href: "#experiences", label: "Experiences" },
    { href: "#contact", label: "Contact" },
];

export const words = [
    { text: "Creative", article: "a", image: "images/creative.svg" },
    { text: "Motivated", article: "a", image: "images/motivated.svg" },
    { text: "Innovative", article: "an", image: "images/innovative.svg" },
    { text: "Passionate", article: "a", image: "images/passionate.svg" },
    { text: "Problem Solver", article: "a", image: "images/problem-solver.svg" },
    { text: "Team Player", article: "a", image: "images/teamwork.svg" },
    { text: "Creative", article: "a", image: "images/creative.svg" },
    { text: "Motivated", article: "a", image: "images/motivated.svg" },
    { text: "Innovative", article: "an", image: "images/innovative.svg" },
    { text: "Passionate", article: "a", image: "images/passionate.svg" },
    { text: "Problem Solver", article: "a", image: "images/problem-solver.svg" },
    { text: "Team Player", article: "a", image: "images/teamwork.svg" },
];

export const counters = [
    { title: "Years of Experience", suffix: "+", value: 4 },
    { title: "Projects Completed", suffix: "+", value: 7 },
    { title: "Clients Served", suffix: "+", value: 3000000 },
    { title: "Markets Served", suffix: "+", value: 3 },
];

export const frontendSkills = [
    { name: "JS", image: "images/javascript.svg" },
    { name: "Vue.js", image: "images/vuejs.svg" },
    { name: "React.js", image: "images/reactjs.svg" },
    { name: "Nuxt.js", image: "images/nuxt.svg" },
    { name: "Angular", image: "images/angular.svg" },
    { name: "Astro", image: "images/astro.svg" },
]

export const backendSkills = [
    { name: "Node.js", image: "images/nodejs.svg" },
    { name: "Express", image: "images/express.svg" },
    { name: "Spring Boot", image: "images/springboot.svg" },
    { name: "Laravel", image: "images/laravel.svg" },
    { name: "Docker", image: "images/docker.svg" },
    { name: "Strapi", image: "images/strapi.svg" },
]

export const databaseSkills = [
    { name: "MySQL", image: "images/mysql.svg" },
    { name: "PostgreSQL", image: "images/postgresql.svg" },
    { name: "MongoDB", image: "images/mongodb.svg" },
    { name: "Redis", image: "images/redis.svg" },
]

export const devOpsSkills = [
    { name: "Docker", image: "images/docker.svg" },
    { name: "AWS", image: "images/aws.svg" },
    { name: "Hostinger", image: "images/hostinger.svg" },
    { name: "CI/CD", image: "images/ci-cd.svg" },
]

export const otherSkills = [
    { name: "Git", image: "images/git.svg" },
    { name: "GitHub", image: "images/github.svg" },
    { name: "Bitbucket", image: "images/bitbucket.svg" },
    { name: "Figma", image: "images/figma.svg" },
]

export const abilities = [
    {
        title: "Quick Learner",
        description: "I adapt quickly to new technologies and continuously expand my skill set.",
        image: "images/quick-learner.svg"
    },
    {
        title: "Problem Solver",
        description: "I analyze challenges effectively and deliver practical, well-structured solutions.",
        image: "images/problem-solver-2.svg"
    },
    {
        title: "On-Time Delivery",
        description: "I consistently deliver high-quality projects on schedule and within scope.",
        image: "images/on-time.svg"
    },
    {
        title: "Effective Communication",
        description: "I communicate clearly and collaborate efficiently with clients and team members.",
        image: "images/communication.svg"
    }
]

export const projects = [
    {
        company: "MERCATUS",
        position: "Full-stack Engineer",
        title: "Stor.ai",
        subtitle: "Enterprise E-commerce Platform",
        period: "04/2025 – Present",
        description: "Stor.ai is a large-scale enterprise e-commerce platform serving major retail chains across Israel, the US, and multiple international markets. The system provides an end-to-end e-commerce solution, from POS and inventory intake to ordering, promotions, and integrations with payment, delivery, and loyalty services.",
        responsibilities: [
            "Developed and maintained business-critical workflows, including order-related processes, delivery integrations, and operational CMS features for a large-scale e-commerce platform",
            "Owned the implementation of a unified Google authentication flow (OIDC + People API) across web and Cordova-based Android/iOS applications.",
            "Implemented webhook-based integrations with third-party delivery providers to handle driver assignment and delivery events.",
            "Rebuilt and standardized transactional email workflows (order, payment, refund), ensuring consistent behavior across multiple clients.",
            "Maintained CMS modules, fixed production issues, and ensured system stability in a high-traffic environment."
        ],
        technologies: [
            "AngularJS", "Next.js", "Node.js (Express)", "Typescript", "T-SQL",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/stor-ai.svg"
    },
    {
        company: "Genki Tech Solutions",
        position: "Frontend Engineer",
        title: "Yuzu",
        subtitle: "Product sales management for a Jpop band",
        period: "01/2025 – 03/2025",
        description: "Supported the development and maintenance of an e-commerce platform for a popular Japanese idol group's fanclub. The site includes product management, articles, announcements, and fan-related content.",
        responsibilities: [
            "Set up the system and documented technical specifications.",
            "Assisted in debugging and resolving issues left by the previous development team.",
        ],
        technologies: [
            "Reactjs with Typescript", "Ruby on Rails", "Postgres", "Redis",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/yuzu.svg"
    },
    {
        company: "Genki Tech Solutions",
        position: "Fullstack Engineer",
        title: "PTA",
        subtitle: "Parent-Teacher Association",
        period: "06/2024 – 01/2025",
        description: "PTA is a nationwide system supporting communication and relationship management between schools and parent–teacher associations in Japan, developed for government-related education use.",
        responsibilities: [
            "Contributed to the development of a nationwide management system for parents, teachers, students, and school staff.",
            "Built and maintained CMS features for managing announcements, documents, and media content used across schools.",
            "Designed and implemented role-based access control and bulk account provisioning via CSV for parents and guardians.",
            "Developed family relationship management features to handle parent–child and guardian associations.",
            "Integrated notification workflows, including email subscriptions and daily Slack alerts for system activities.",
            "Contributed to system design and long-term operation, including maintenance and coverage testing.",
        ],
        technologies: [
            "Laravel", "jQuery", "MySQL", "Figma",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/pta.svg"
    },
    {
        company: "Genki Tech Solutions",
        position: "Frontend Engineer",
        title: "EMLINX",
        period: "04/2024 – 06/2025",
        description: "Developed a store incident management system for handling theft and damage reports.",
        responsibilities: [
            "Contributed to the development and debugging of ReactJS application with Material UI.",
            "Built a Line Chat integration feature.",
            "Improved user experience.",
        ],
        technologies: [
            "ReactJS with Typescript (Zustand, MUI,... )", "Golang", "Postgres", "Docker", "OpenAPI generator"
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/emlinx.svg"
    },
    {
        company: "Genki Tech Solutions",
        position: "Fullstack Engineer",
        title: "AIdaBot",
        subtitle: "AI-powered Q&A & Document Intelligence Platform",
        period: "12/2023 – 04/2024",
        description: "AIdaBot is an AI-powered document Q&A assistant that improves information access by combining AWS OpenSearch with ChatGPT and LangChain for optimized retrieval and context-aware responses.",
        responsibilities: [
            "Contributed to the design and implementation of an AI-assisted document Q&A platform, focusing on system architecture and CMS.",
            "Developed and maintained CMS features for managing documents, configurations, and chatbot behavior.",
            "Designed system workflows to support document-based question answering using ChatGPT, LangChain, and AWS OpenSearch.",
            "Integrated the chatbot with Facebook Fanpage messaging to enable real-time user interactions and automated responses.",
            "Integrated the chatbot into external websites via embeddable scripts, including a proof of concept using a custom Liferay portlet.",
            "Implemented unit tests and contributed to system stability through iterative improvements and ongoing maintenance."
        ],
        technologies: [
            "Nuxt.js", "Node.js (Express)", "MySQL", "Redis", "Docker", "AWS OpenSearch", "ChatGPT", "LangChain"
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/aidabot.svg"
    },
    {
        company: "Genki Tech Solutions",
        position: "Fullstack Engineer",
        title: "PMS",
        subtitle: "Property Management System - Smart Hotel & Facial Recognition Platform",
        period: "12/2021 – 11/2023",
        description: "PMS is a smart hotel management system designed for contactless operations during the COVID-19 period, enabling unmanned hotel workflows through facial recognition–based check-in and service usage. The platform integrates with most major OTA providers, like Booking.com and Agoda, and supports area-based service management",
        responsibilities: [
            "Developed and maintained a smart hotel management platform enabling contactless, unmanned operations for enterprise clients in Japan, covering reservations, check-in workflows, and on-site services.",
            "Played a key role in designing and implementing facial recognition–based check-in systems, including end-to-end UI and backend workflows for iPad devices environments.",
            "Integrated OCR and facial recognition into the check-in flow, significantly reducing manual input and on-site staff workload.",
            "Implemented and optimized AWS Rekognition, improving facial recognition accuracy by approximately 90% compared to the previous solution.",
            "Optimized backend APIs for reservation and check-in flows, reducing response time by around 20% in critical user journeys.",
            "Contributed to complex third-party integrations, including OTA platforms, payment kiosks, room cleaning systems, and real-world deployments such as a facial recognition–based ticketing system for the Sado Gold Mine tourist site."
        ],
        technologies: [
            "Vue.js (Vue 2, Vuex, BootstrapVue)", "Spring Boot", "Koa.js", "AWS Rekognition", "Swift UI Kit", "MySQL"
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/pms.svg"
    },
    {
        company: "CYBERDINO (Freelance)",
        position: "Fullstack Engineer",
        title: "Nhat Quang Edu Game",
        subtitle: "AI-assisted Career Orientation Platform",
        period: "06/2024 – 12/2024",
        description: "Nhat Quang Edu Game is an educational simulation platform that evaluates users through interactive challenges to provide career orientation, with AI-assisted tools for generating tasks and missions based on industry trends.",
        responsibilities: [
            "Contributed to the development and debugging of ReactJS application with Material UI.",
            "Built a Line Chat integration feature.",
            "Improved user experience.",
        ],
        technologies: [
            "React.js", "TypeScript", "React Query", "Ant Design", "Tailwind CSS", "Strapi", "PostgreSQL", "Gemini API", "OpenAI API"
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/nhatquang.svg"
    },
    {
        company: "Freelancer",
        position: "Fullstack Engineer",
        title: "HR-Lotus",
        subtitle: "Human Resource Management System (Healthcare)",
        period: "06/2025 – 12/2025",
        description: "HR Lotus is a hospital-focused HR management system supporting staff management, task assignment, payroll calculation, and workflow tracking.",
        responsibilities: [
            "Contributed to the development and debugging of ReactJS application with Material UI.",
            "Built a Line Chat integration feature.",
            "Improved user experience.",
        ],
        technologies: [
            "Vue 3", "TypeScript", "Vue Query", "Element+", "Tailwind CSS", "Node.js (Express)", "PostgreSQL", "Docker"
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/hr-lotus.svg"
    },
]

export const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/lam-doan-nguyen/", icon: "images/linkedin.svg" },
    { name: "GitHub", url: "https://github.com/doannguyenlam13072000", icon: "images/github.svg" },
    { name: "Facebook", url: "https://www.facebook.com/casbiener/", icon: "images/facebook.svg" },
    { name: "Instagram", url: "https://www.instagram.com/lamdoannguyen/", icon: "images/instagram.svg" },
]