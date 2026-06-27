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
    { title: "Years of Experience", suffix: "+", value: 4.5, decimalPlaces: 1 },
    { title: "Projects Completed", suffix: "+", value: 9 },
    { title: "Clients Served", suffix: "+", value: 3000000 },
    { title: "Markets Served", suffix: "+", value: 4 },
];

export const frontendSkills = [
    { name: "React.js", image: "images/reactjs.svg" },
    { name: "Vue.js", image: "images/vuejs.svg" },
    { name: "AngularJS", image: "images/angular.svg" },
    { name: "Nuxt.js", image: "images/nuxt.svg" },
    { name: "TypeScript", image: "images/javascript.svg" },
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
    { name: "PostgreSQL", image: "images/postgresql.svg" },
    { name: "MySQL", image: "images/mysql.svg" },
    { name: "MongoDB", image: "images/mongodb.svg" },
    { name: "Redis", image: "images/redis.svg" },
]

export const devOpsSkills = [
    { name: "AWS", image: "images/aws.svg" },
    { name: "Docker", image: "images/docker.svg" },
    { name: "CI/CD", image: "images/ci-cd.svg" },
    { name: "VPS", image: "images/hostinger.svg" },
]

export const otherSkills = [
    { name: "Git", image: "images/git.svg" },
    { name: "GitHub", image: "images/github.svg" },
    { name: "Figma", image: "images/figma.svg" },
    { name: "Bitbucket", image: "images/bitbucket.svg" },
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
        company: "SENDO FARM",
        position: "Frontend Engineer",
        title: "Sendo Farm",
        subtitle: "E-commerce Platform",
        period: "05/2025 – Present",
        description: "Large-scale social commerce and e-commerce platform serving the Vietnamese market, providing fresh food delivery, membership programs, promotional campaigns, and neighborhood pickup stations through App, Web and Zalo Mini App.",
        responsibilities: [
            "Delivered key e-commerce features, including D2D delivery, Station Pickup refactoring, and Membership Packages, improving the platform's ordering and customer experience.",
            "Maintained the Micro Frontend architecture, led frontend rebranding initiatives, and managed the development and release of the Zalo Mini App.",
            "Integrated Firebase Analytics for product tracking and owned deployment and release processes across web and Mini App platforms.",
        ],
        technologies: [
            "React", "TypeScript", "SCSS", "Webpack", "Micro Frontend", "Firebase",
        ],
        companyImage: "images/sendo.png",
        icon: "images/stor-ai.svg"
    },
    {
        company: "MERCATUS",
        position: "Full-stack Engineer",
        title: "Stor.ai",
        subtitle: "Enterprise E-commerce Platform",
        period: "04/2025 – 04/2026",
        description: "Stor.ai is a large-scale enterprise e-commerce platform serving major retail chains across Israel, the US, and multiple international markets. The system provides an end-to-end e-commerce solution, from POS and inventory intake to ordering, promotions, and integrations with payment, delivery, and loyalty services.",
        responsibilities: [
            "Developed and maintained business-critical workflows, including order-related processes, delivery integrations, and operational CMS features for a large-scale e-commerce platform.",
            "Owned the implementation of a unified Google authentication flow (OIDC + People API) across web and Cordova-based Android/iOS applications.",
            "Implemented webhook-based integrations with third-party delivery providers to handle driver assignment and delivery events.",
            "Rebuilt and standardized transactional email workflows (order, payment, refund), ensuring consistent behavior across multiple clients.",
            "Maintained CMS modules, fixed production issues, and ensured system stability in a high-traffic environment.",
        ],
        technologies: [
            "AngularJS", "Next.js", "Node.js (Express)", "Typescript", "T-SQL",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/stor-ai.svg"
    },
    {
        company: "GENKI SYSTEM CORPORATION",
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
            "React.js with TypeScript", "Ruby on Rails", "PostgreSQL", "Redis",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/yuzu.svg"
    },
    {
        company: "Freelancer",
        position: "Full-stack Engineer",
        title: "HR Lotus",
        subtitle: "Human Resource Management System (Healthcare)",
        period: "06/2025 – Present",
        description: "HR Lotus is a healthcare-focused human resource management platform designed for hospitals and care providers. The system streamlines workforce management while supporting patient care planning, operational workflows, and caregiver collaboration.",
        responsibilities: [
            "Developed a healthcare-focused HR management system supporting administrators, support workers, and clients.",
            "Designed and implemented core HR workflows, including staff management, task assignment, payroll calculation, and operational tracking.",
            "Built the Leave Request module, enabling employees and managers to submit, approve, and track leave requests through configurable approval workflows.",
            "Developed the Daily Care Plan feature, allowing caregivers to create personalized daily care schedules for patients.",
            "Implemented task management workflows within Daily Care Plans to help caregivers monitor patient health conditions, treatment progress, and daily activities.",
            "Designed and developed backend services and RESTful APIs using Node.js and TypeScript.",
            "Deployed and maintained the application in a Docker-based VPS environment.",
        ],
        technologies: [
            "Vue 3", "TypeScript", "Vue Query", "Element+", "Tailwind CSS", "Node.js (Express)", "PostgreSQL", "Docker",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/hr-lotus.svg"
    },
    {
        company: "CYBERDINO",
        position: "Freelance Full-stack Engineer",
        title: "Nhat Quang Edu Game",
        subtitle: "AI-assisted Career Orientation Platform",
        period: "06/2024 – 11/2024",
        description: "Nhat Quang Edu Game is an educational simulation platform that evaluates users through interactive challenges to provide career orientation, with AI-assisted tools for generating tasks and missions based on industry trends.",
        responsibilities: [
            "Developed an educational simulation platform for career orientation, using structured assessments and AI-assisted recommendations to guide users toward suitable career paths.",
            "Designed and built interactive user interfaces with React and TypeScript, focusing on usability, responsiveness, and performance.",
            "Implemented AI-assisted logic and backend data workflows to support questionnaire evaluation and career recommendations.",
            "Integrated third-party services such as ReadyPlayer.me for 3D avatar customization, enhancing user engagement and personalization.",
        ],
        technologies: [
            "React.js", "TypeScript", "React Query", "Ant Design", "Tailwind CSS", "Strapi", "PostgreSQL", "Gemini API", "OpenAI API",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/nhatquang.svg"
    },
    {
        company: "GENKI SYSTEM CORPORATION",
        position: "Full-stack Engineer",
        title: "PTA",
        subtitle: "Parent–Teacher Association – Government Education System, Japan",
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
            "Laravel", "MySQL", "jQuery", "Figma",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/pta.svg"
    },
    {
        company: "GENKI SYSTEM CORPORATION",
        position: "Frontend Engineer",
        title: "EMLINX",
        subtitle: "Store Incident Management System",
        period: "04/2024 – 06/2025",
        description: "Developed a store incident management system for handling theft and damage reports across retail operations.",
        responsibilities: [
            "Contributed to the development and debugging of a React application with Material UI.",
            "Built a Line Chat integration feature for real-time incident reporting.",
            "Improved user experience and workflow efficiency for store staff.",
        ],
        technologies: [
            "React.js with TypeScript (Zustand, MUI)", "Golang", "PostgreSQL", "Docker", "OpenAPI Generator",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/emlinx.svg"
    },
    {
        company: "GENKI SYSTEM CORPORATION",
        position: "Full-stack Engineer",
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
            "Implemented unit tests and contributed to system stability through iterative improvements and ongoing maintenance.",
        ],
        technologies: [
            "Nuxt.js", "Node.js (Express)", "MySQL", "Redis", "Docker", "AWS OpenSearch", "ChatGPT", "LangChain",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/aidabot.svg"
    },
    {
        company: "GENKI SYSTEM CORPORATION",
        position: "Full-stack Engineer",
        title: "PMS",
        subtitle: "Property Management System - Smart Hotel & Facial Recognition Platform",
        period: "12/2021 – 11/2023",
        description: "PMS is a smart hotel management system designed for contactless operations during the COVID-19 period, enabling unmanned hotel workflows through facial recognition–based check-in and service usage. The platform integrates with most major OTA providers, like Booking.com and Agoda, and supports area-based service management.",
        responsibilities: [
            "Developed and maintained a smart hotel management platform enabling contactless, unmanned operations for enterprise clients in Japan, covering reservations, check-in workflows, and on-site services.",
            "Played a key role in designing and implementing facial recognition–based check-in systems, including end-to-end UI and backend workflows for iPad devices and kiosk environments.",
            "Integrated OCR and facial recognition into the check-in flow, significantly reducing manual input and on-site staff workload.",
            "Implemented and optimized AWS Rekognition, improving facial recognition accuracy by approximately 90% compared to the previous solution.",
            "Optimized backend APIs for reservation and check-in flows, reducing response time by around 20% in critical user journeys.",
            "Contributed to complex third-party integrations, including OTA platforms, payment kiosks, room cleaning systems, and real-world deployments such as a facial recognition–based ticketing system for the Sado Gold Mine tourist site.",
        ],
        technologies: [
            "Vue.js (Vue 2, Vuex, BootstrapVue)", "Spring Boot", "Koa.js", "AWS Rekognition", "Swift UI Kit",
        ],
        companyImage: "images/circle-filled.svg",
        icon: "images/pms.svg"
    },
]

export const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/lam-doan-nguyen/", icon: "images/linkedin.svg" },
    { name: "GitHub", url: "https://github.com/doannguyenlam13072000", icon: "images/github.svg" },
    { name: "Facebook", url: "https://www.facebook.com/casbiener/", icon: "images/facebook.svg" },
    { name: "Instagram", url: "https://www.instagram.com/lamdoannguyen/", icon: "images/instagram.svg" },
]
