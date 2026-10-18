export interface BlogSectionItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageCaption?: string;
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
  tip?: string;
}

export interface GalleryImage {
  url: string;
  caption: string;
  alt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  formattedDate: string;
  readTime: string;
  featured?: boolean;
  coverImage?: string;
  coverImageCaption?: string;
  galleryImages?: GalleryImage[];
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  introduction: string;
  sections: BlogSectionItem[];
  keyTakeaways: string[];
  conclusion: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "aws-sbg-cdo-mini-hackathon-champions",
    title: "Champions at the AWS SBG - CDO Mini Hackathon: Building RoutaCagayan",
    excerpt:
      "How our team built RoutaCagayan and clinched 1st Place / Champions at the AWS Student Builder Group Cagayan de Oro Mini Hackathon — exploring agentic development and intelligent commute routing.",
    category: "Hackathons & Competitions",
    date: "2026-10-18",
    formattedDate: "October 18, 2026",
    readTime: "5 min read",
    featured: true,
    coverImage: "/images/blog/aws-sbg-champions.jpg",
    coverImageCaption:
      "Championship Team celebrating 1st Place at the AWS Student Builder Group - Cagayan de Oro Mini Hackathon",
    galleryImages: [
      {
        url: "/images/blog/aws-sbg-champions.jpg",
        caption: "Awarding ceremony: Crowned Champions at the AWS SBG - CDO Mini Hackathon with our custom winner tees & project showcase",
        alt: "Championship Team holding winner shirts and displaying RoutaCagayan",
      },
      {
        url: "/images/blog/routacagayan-development.jpg",
        caption: "Rapid prototyping & agentic development of RoutaCagayan's transit navigation interface during the hackathon sprint",
        alt: "Developing RoutaCagayan interactive map and route engine on laptop",
      },
      {
        url: "/images/blog/aws-sbg-group.jpg",
        caption: "Builders, organizers, and mentors gathered together for the AWS Student Builder Group Cagayan de Oro Hackathon",
        alt: "Full group photo of AWS Student Builder Group Cagayan de Oro community",
      },
    ],
    tags: [
      "AWS",
      "Hackathon",
      "Agentic AI",
      "Kiro",
      "RoutaCagayan",
      "Cagayan de Oro",
      "Cloud Architecture",
    ],
    author: {
      name: "Wayne Obial",
      role: "Lead Full-Stack Developer",
      avatar: "/images/Me.jpg",
    },
    introduction:
      "When tech communities unite to solve tangible, localized problems, magic happens. At the AWS Student Builder Group (SBG) - Cagayan de Oro Mini Hackathon under the theme 'Beyond Vibe Coding: Agentic Development with Kiro', our team set out to tackle one of the most persistent everyday headaches in our city: navigating local public transit. After hours of intensive sprint development, agentic workflow orchestration, and high-energy pitching, we were honored to be named the Champions of the competition!",
    sections: [
      {
        id: "the-challenge",
        title: "1. The Challenge: Where Are You Heading? (Saan ka pupunta?)",
        content:
          "For thousands of commuters, students, and visitors traversing Cagayan de Oro every day, figuring out which jeepney route passes by their destination, where to transfer, and how much the fare costs is often left to word-of-mouth guesswork. We asked ourselves: what if commuters had an intelligent, interactive transit assistant that maps out optimal jeepney routes, stops, and transfers across CDO in real-time? That question gave birth to RoutaCagayan.",
        image: "/images/blog/routacagayan-development.jpg",
        imageCaption:
          "RoutaCagayan's transit navigation interface and route finder being engineered during the hackathon.",
      },
      {
        id: "agentic-development",
        title: "2. Beyond Vibe Coding: Agentic AI in Action",
        content:
          "The hackathon spotlighted 'Beyond Vibe Coding'—moving past simple autocomplete prompts to harness agentic development with Kiro. Instead of treating AI as just a chatbot, we orchestrated agentic pipelines that ingested local road networks, validated route schemas, and iteratively generated transit graph algorithms. This allowed our team to ship both a responsive web app and mobile-optimized view in record time.",
        codeSnippet: {
          language: "typescript",
          filename: "lib/routing/transitRouter.ts",
          code: `// RoutaCagayan Agentic Transit Engine for CDO Commuters
export interface TransitRouteQuery {
  origin: string;
  destination: string;
  modePreference?: "jeepney" | "relay" | "fastest";
}

export async function resolveOptimalCDORoute(query: TransitRouteQuery) {
  const router = new CDOTransitGraph({
    hubs: ["Divisoria", "Corrales", "Agora", "Carmen", "Bulua"],
    transportModes: ["Jeepney (R1/R2)", "Modern PUV", "Relay"],
  });

  // Agentic computation of transfers and estimated fare
  return await router.findTransitPath({
    from: query.origin,
    to: query.destination,
    includeLandmarks: true,
  });
}`,
        },
        tip: "Agentic development shines when you provide strict domain constraints and deterministic validation layers around model outputs.",
      },
      {
        id: "the-community",
        title: "3. High Energy & The AWS CDO Community",
        content:
          "The atmosphere in the hall was electrifying. Dozens of student builders, developers, and mentors from across Northern Mindanao gathered under the banner of the AWS Student Builder Group Cagayan de Oro. Seeing the diverse spectrum of projects and exchanging ideas with fellow cloud enthusiasts pushed every team to elevate their craft.",
        image: "/images/blog/aws-sbg-group.jpg",
        imageCaption:
          "The vibrant community of builders, organizers, and mentors at the AWS SBG - CDO Mini Hackathon.",
      },
      {
        id: "the-triumph",
        title: "4. The Pitch & Victory",
        content:
          "When it came time for the final pitch, we demonstrated RoutaCagayan live: querying complex commuter routes from terminal to terminal, displaying dynamic map routes, and showing step-by-step transfer instructions. The judges recognized the real-world social impact, technical architecture, and polished user experience—awarding our team 1st Place / Champions!",
        image: "/images/blog/aws-sbg-champions.jpg",
        imageCaption:
          "Holding our championship shirts and celebrating our 1st place victory on stage.",
      },
    ],
    keyTakeaways: [
      "Target authentic local needs: RoutaCagayan succeeded because public transit in Cagayan de Oro directly touches the everyday lives of Kagay-anons.",
      "Embrace agentic engineering: Moving beyond casual prompt injection to structured agent workflows dramatically accelerates prototype-to-production velocity.",
      "Thrive in community: The energy, mentorship, and camaraderie of the AWS Student Builder Group CDO makes building software an unforgettable experience.",
    ],
    conclusion:
      "Winning the AWS SBG - CDO Mini Hackathon is a tremendous milestone, but it's only the beginning. We're excited to continue refining RoutaCagayan, expanding the route dataset, and deploying it as a free, reliable transit companion for the people of Cagayan de Oro. A huge salute to the organizers, mentors, my awesome teammates, and everyone in the AWS builder community!",
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map((post) => post.category)));
}
