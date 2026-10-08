export type Project = {
  title: string;
  slug: string;
  description: string;
  description2?: string;
  languages?: string[];
  link: string;
  github?: string;
  image?: string;
  category?: string;
  role?: string;
  year?: string;
  overview?: string;
  features?: string[];
  highlights?: string[];
};

export const projects: Project[] = [
  {
    title: "School Sports Management System",
    slug: "school-sports-management-system",
    description: "A web application to manage school sports events, teams, and schedules.",
    description2: "Built with Next.js, Tailwind CSS, and Supabase for real-time data handling.",
    languages: ["Next.js", "Tailwind CSS", "Supabase", "TypeScript", "React"],
    link: "#",
    github: "https://github.com/wynnee0110",
    image: "/images/works/3.webp",
    category: "Web Application",
    role: "Lead Full-Stack Developer",
    year: "2024",
    overview:
      "A comprehensive sports event management platform built to coordinate school athletics, inter-school tournaments, and team standings. The application replaces disorganized manual paperwork with automated bracket scheduling, real-time score broadcasts, and verified roster tracking.",
    features: [
      "Automated tournament brackets and round-robin schedule generation",
      "Real-time game scoring powered by Supabase database subscriptions",
      "Player profile registry with photo IDs and team roster assignments",
      "Role-based administrative dashboards for coaches, referees, and event directors",
    ],
    highlights: [
      "Reduced tournament scheduling friction by over 70%",
      "Instant live scoreboard updates without manual browser refresh",
      "Secure authenticated data access for authorized event staff",
    ],
  },
  {
    title: "archive",
    slug: "archive",
    description: "A community-driven social platform where users share posts, interact, and build their online presence.",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    link: "https://ar7.vercel.app/",
    github: "https://github.com/wynnee0110",
    image: "/images/works/fallback.webp",
    category: "Social Platform",
    role: "Full-Stack Developer",
    year: "2024",
    overview:
      "A modern, community-driven social networking application engineered for seamless real-time conversation and content sharing. Designed with a clean, distraction-free aesthetic and high performance, archive allows members to post thoughts, upload media, curate profiles, and engage through comments and reactions.",
    features: [
      "Real-time interactive feed with media uploads and rich text formatting",
      "Secure user authentication and customizable avatar/profile headers",
      "Nested commentary threads with instant like and interaction counters",
      "Robust PostgreSQL schema with Supabase Row Level Security (RLS)",
    ],
    highlights: [
      "Sub-second optimistic UI updates for instant social interactions",
      "Granular Row Level Security policies protecting personal user data",
      "Fully responsive design optimized for mobile and desktop screens",
    ],
  },
  {
    title: "ERP System with AI Database Query",
    slug: "erp-system-ai-database-query",
    description: "An intelligent ERP platform that streamlines business operations and team workflows through automation and centralized data management.",
    description2: "Built with the PERN stack, it features AI-powered query assistance, real-time dashboards, task tracking, and secure role-based access.",
    languages: ["PostgreSQL", "Express.js", "React", "Node.js", "Tailwind CSS", "Refine", "Neon DB", "Gemini API"],
    link: "#",
    github: "https://github.com/wynnee0110",
    image: "/images/works/fallback.webp",
    category: "Enterprise & AI",
    role: "Full-Stack Engineer",
    year: "2024",
    overview:
      "An intelligent Enterprise Resource Planning system created to eliminate operational friction and democratize business analytics. Integrated with Google Gemini API, non-technical team members can query complex databases using conversational plain text to extract business insights instantly.",
    features: [
      "Natural language to SQL query engine powered by Google Gemini API",
      "Centralized operational workflows for inventory, procurement, and task management",
      "Live visual analytics dashboards with responsive charting and data export",
      "Enterprise-grade role-based access control (RBAC) and audited data mutations",
    ],
    highlights: [
      "Natural language processing translates everyday questions into valid SQL queries",
      "Serverless PostgreSQL on Neon DB enabling effortless horizontal scale",
      "Granular permissions preventing unauthorized access to sensitive company records",
    ],
  },
  {
    title: "VaultCli",
    slug: "vaultcli",
    description: "A self hosted vault for your secrets, and keys.",
    description2: "Secure encrypted credential store with Argon2 key derivation, zero-knowledge architecture, and intuitive terminal commands.",
    languages: ["Python", "Supabase", "Argon2", "CLI", "JSON", "REST API", "Cryptography"],
    link: "https://vault-cli-site.vercel.app/",
    github: "https://github.com/wynnee0110/VaultCli",
    image: "/images/works/4.webp",
    category: "Security & CLI Tool",
    role: "Author & Maintainer",
    year: "2024",
    overview:
      "A privacy-first terminal utility built for engineers who need to securely manage, organize, and retrieve sensitive environment variables, API tokens, and credentials right from their shell. VaultCli keeps encryption keys client-side, ensuring zero-knowledge cloud synchronization.",
    features: [
      "Client-side AES-256 encryption using Argon2id master key derivation",
      "Terminal autocompletion and interactive search for rapid credential retrieval",
      "Automatic clipboard copying with timed auto-clear for credential protection",
      "Secure cloud backup and multi-machine sync via encrypted Supabase REST endpoints",
    ],
    highlights: [
      "Zero-knowledge architecture ensures server never sees unencrypted master keys",
      "Configurable auto-clear clipboard timer safeguards sensitive credentials",
      "Compact Python CLI executable easily installed in any POSIX environment",
    ],
  },
  {
    title: "Cinefy",
    slug: "cinefy",
    description: "A movie platform for movie lovers",
    description2: "Features authentication, profiles, avatars, likes, comments, and real-time engagement powered by a modern full-stack architecture.",
    languages: ["React", "Tailwind CSS", "Express.js", "Redis", "Node.js"],
    link: "https://cinefy-pi.vercel.app/",
    github: "https://github.com/wynnee0110/cinefy",
    image: "/images/works/6.webp",
    category: "Entertainment Web App",
    role: "Full-Stack Developer",
    year: "2024",
    overview:
      "A curated movie catalog and discovery web application designed for film enthusiasts. Cinefy combines movie databases with high-speed Redis caching, personalized watchlist curation, and rich community reviews to deliver an immersive cinematic discovery experience.",
    features: [
      "In-memory Redis cache layer delivering sub-50ms catalog searches and filters",
      "Curated trending carousels, genre exploration, and detailed cast bios",
      "User watchlist management with persistent sync across devices",
      "Responsive cinematic dark mode interface crafted with Tailwind CSS",
    ],
    highlights: [
      "Redis caching layer dramatically minimizes third-party movie API quotas",
      "Instant trailer playback and media previews embedded into detail views",
      "Fluid animations and optimized image carousels for mobile browsing",
    ],
  },
  {
    title: "Cortex",
    slug: "cortex",
    description: "A memory layer for AI agents for your projects",
    description2: "Features context management, memory storage, and retrieval for AI agents, enabling them to learn and adapt over time.",
    languages: ["React", "Tailwind CSS", "Express.js", "Redis", "TypeScript"],
    link: "https://github.com/wynnee0110/Cortex",
    github: "https://github.com/wynnee0110/Cortex",
    image: "/images/works/7.webp",
    category: "AI & Developer Tooling",
    role: "Creator & Maintainer",
    year: "2024",
    overview:
      "An open-source persistent memory abstraction engineered for autonomous AI agents. Cortex provides short-term conversation retention and long-term semantic knowledge retrieval, allowing LLM agents to maintain continuity, remember facts, and adapt to users over multiple sessions.",
    features: [
      "Dual-tier memory architecture combining high-speed Redis and vector embeddings",
      "Automatic conversation condensation and semantic topic extraction",
      "Developer SDK and REST API for seamless integration with LangChain and custom agents",
      "Interactive web inspector to visualize and manage agent memory graphs",
    ],
    highlights: [
      "Reduces LLM token consumption by condensing historical conversational context",
      "Sub-millisecond retrieval of key-value memory states with Redis",
      "Extensible modular adapter pattern ready for custom vector databases",
    ],
  },
  {
    title: "Image-EXIF-tool",
    slug: "image-exif-tool",
    description: "A npm package for extracting EXIF data, edit, delete, and add EXIF data to images",
    description2: "It is a fast and efficient tool for working with EXIF data",
    languages: ["TypeScript", "NPM", "Node.js"],
    link: "https://github.com/wynnee0110/Image-EXIF-tool",
    github: "https://github.com/wynnee0110/Image-EXIF-tool",
    image: "/images/works/fallback.webp",
    category: "NPM Package & Utility",
    role: "Package Author",
    year: "2024",
    overview:
      "A lightweight, dependency-free TypeScript library for parsing, editing, and wiping EXIF metadata from image files. Built for both Node.js backends and browser runtimes, it empowers developers to inspect photograph telemetry or sanitize metadata to protect privacy.",
    features: [
      "Low-level binary buffer parsing with high throughput and minimal memory overhead",
      "Extracts GPS coordinates, camera maker, shutter speed, ISO, and aperture data",
      "One-click metadata sanitization to scrub personal telemetry before upload",
      "Full TypeScript typings with zero external runtime dependencies",
    ],
    highlights: [
      "Zero dependencies ensures tiny package footprint and frictionless installation",
      "Dual support for server-side Node.js buffer and client-side ArrayBuffer/File APIs",
      "Protects user privacy by stripping sensitive location coordinates",
    ],
  },
  {
    title: "tg-devtools",
    slug: "tg-devtools",
    description: "A telegram bot that has essential tools for a dev",
    description2: "Developer utility bot with instant encodings, parsers, and quick testing tools.",
    languages: ["Python", "Google Cloud", "BotFather", "Telegram API"],
    link: "https://github.com/wynnee0110/tg-devtools",
    github: "https://github.com/wynnee0110/tg-devtools",
    image: "/images/works/fallback.webp",
    category: "Telegram Bot & Automation",
    role: "Developer",
    year: "2024",
    overview:
      "A handy developer companion bot built for the Telegram messenger ecosystem. Instead of switching tabs or launching terminals for routine dev tasks, engineers can send commands to convert timestamps, inspect tokens, and format payloads on the go.",
    features: [
      "Base64, URL encoding, MD5/SHA256 hashing, and UUID generation",
      "JSON formatting, validation, and JWT payload decoding",
      "Serverless cloud hosting on Google Cloud Platform for zero-maintenance 24/7 uptime",
      "Interactive inline keyboard controls and quick help documentation",
    ],
    highlights: [
      "Lightweight serverless webhook architecture runs efficiently on GCP",
      "Instant response times for frequent daily developer conversions",
      "Intuitive command structure built with standard Telegram BotFather conventions",
    ],
  },
  {
    title: "ScanSync",
    slug: "scansync",
    description: "A QR-based attendance management system built for ICpEP.SE-USTP.",
    description2:
      "Built with a React Native mobile app using Expo and a FastAPI backend, ScanSync enables fast QR attendance scanning, event management, real-time attendance tracking, and personalized dashboards.",
    languages: [
      "React Native",
      "Expo",
      "FastAPI",
      "Python",
      "Supabase",
      "Google Cloud",
    ],
    link: "https://scan-sync-app.vercel.app/",
    github: "https://github.com/wynnee0110",
    image: "/images/works/scansync.png",
    category: "Mobile App & Backend",
    role: "Lead Mobile & Backend Developer",
    year: "2024",
    overview:
      "An end-to-end QR-based attendance tracking ecosystem created specifically for ICpEP.SE-USTP. Enables student officers to scan hundreds of event attendees in minutes while providing real-time verification and automated reporting.",
    features: [
      "High-speed camera QR code scanner with offline queuing and collision prevention",
      "FastAPI backend microservice delivering sub-100ms verification responses",
      "Live attendance count and demographic analytics on officer dashboard",
      "Automated attendance certification generation and CSV/Excel export",
    ],
    highlights: [
      "Handles high throughput event check-ins without queue bottlenecks",
      "Offline sync mechanism guarantees zero lost attendance records during network drops",
      "Adopted officially for university organization events and technical conferences",
    ],
  },
  {
    title: "NLP Scheduling Automation",
    slug: "nlp-scheduling-automation",
    description:
      "A telegram bot to create an event schedule using natural language, using patterns from everyday language, and will automatically set in google calendar",
    description2: "Personal AI scheduling assistant integrating Telegram with Google Calendar.",
    languages: [
      "Python",
      "Google Cloud",
      "BotFather",
      "Google Calendar API",
    ],
    link: "https://github.com/wynnee0110",
    github: "https://github.com/wynnee0110",
    image: "/images/works/fallback.webp",
    category: "AI & Automation",
    role: "Developer",
    year: "2024",
    overview:
      "A conversational bot that converts natural human language inputs like 'team sync next Tuesday at 3pm' into scheduled events with alerts directly in Google Calendar. Built to streamline day-to-day agenda organization without tedious form entry.",
    features: [
      "Natural language date and time parsing recognizing colloquial conversational phrases",
      "Automated Google Calendar event creation via authenticated Google APIs",
      "Intelligent conflict warning when a proposed event overlaps with existing schedules",
      "Google Cloud serverless backend ensuring responsive chat handling",
    ],
    highlights: [
      "Saves time by removing manual date pickers and form filling",
      "Secure OAuth 2.0 token flow safeguarding private Google account access",
      "Regex and NLP pattern matching engine parsing versatile date formats",
    ],
  },
  {
    title: "Tunnel",
    slug: "tunnel",
    description: "A random stranger chat app where chats disappear after few exchanges of messages",
    description2: "Built with Next.js, Tailwind CSS, and Firebase for real-time data handling.",
    languages: ["Next.js", "Tailwind CSS", "Firebase", "TypeScript", "React"],
    link: "https://tunnel-delta-indol.vercel.app/",
    github: "https://github.com/wynnee0110",
    image: "/images/works/9.webp",
    category: "Real-Time Web Application",
    role: "Full-Stack Developer",
    year: "2024",
    overview:
      "An ephemeral anonymous chat platform connecting strangers in pairs. Messages self-destruct after exchanging a set count, creating a spontaneous, privacy-centric conversation space without saved logs or histories.",
    features: [
      "Instant stranger matchmaking queue with zero registration required",
      "Self-destructing message lifecycle for total communication privacy",
      "Firebase Realtime Database syncing keystrokes and typing indicators",
      "Sleek retro-minimalist interface with sound alerts and dark theme",
    ],
    highlights: [
      "Zero persistent user history ensuring maximum privacy protection",
      "Low-latency real-time message exchange via WebSocket/Firebase channels",
      "Fluid responsive layout with crisp dark mode and audio feedback cues",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
