import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "./components/Preloader";
import { ThemeProvider } from "next-themes";



export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hexctl.dev"),
  title: {
    default: "Wayne Obial | Software Developer & Full-Stack Engineer (hexctl.dev)",
    template: "%s | Wayne Obial — hexctl.dev",
  },
  description:
    "Wayne Obial — Software Developer & Full-Stack Engineer. Discover portfolio projects, interactive simulations, and tech achievements on hexctl.dev.",
  keywords: [
    "Wayne Obial",
    "Wayne Obial portfolio",
    "Wayne Obial software developer",
    "Wayne Obial engineer",
    "Wayne Obial developer",
    "Wayne Obial USTP",
    "Wayne Obial hexctl",
    "hexctl",
    "hexctl.dev",
    "full-stack developer",
    "software developer portfolio",
    "Wayne Obial projects",
  ],
  authors: [{ name: "Wayne Obial", url: "https://hexctl.dev" }],
  creator: "Wayne Obial",
  publisher: "Wayne Obial",
  alternates: {
    canonical: "https://hexctl.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hexctl.dev",
    siteName: "hexctl.dev — Wayne Obial",
    title: "Wayne Obial | Software Developer & Full-Stack Engineer",
    description:
      "Explore portfolio builds, algorithm visualizers, and web development projects by Wayne Obial on hexctl.dev.",
    images: [
      {
        url: "/images/Me.jpg",
        width: 800,
        height: 800,
        alt: "Wayne Obial Profile Picture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wayne Obial | Software Developer — hexctl.dev",
    description:
      "Explore portfolio builds, algorithm visualizers, and software projects by Wayne Obial.",
    creator: "@Waynnneee1",
    images: ["/images/Me.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://hexctl.dev/#person",
      name: "Wayne Obial",
      alternateName: [
        "Wayne Obial",
        "Jeruh John Wayne Llacuna Obial",
        "hexctl",
        "Wayne Obial hexctl",
      ],
      url: "https://hexctl.dev",
      image: "https://hexctl.dev/images/Me.jpg",
      jobTitle: "Software Developer",
      description:
        "Wayne Obial is a Software Developer, Full-Stack Engineer, and Head of Web Development at ICpEP.SE USTP.",
      worksFor: {
        "@type": "Organization",
        name: "ICpEP.SE USTP",
      },
      sameAs: [
        "https://github.com/wynnee0110",
        "https://www.linkedin.com/in/jeruh-john-wayne-llacuna-obial-5404a4374/",
        "https://leetcode.com/u/wynnee0110/",
        "https://X.com/Waynnneee1",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://hexctl.dev/#website",
      url: "https://hexctl.dev",
      name: "hexctl.dev — Wayne Obial Portfolio",
      description:
        "Official personal website and portfolio of Wayne Obial — Software Developer.",
      publisher: {
        "@id": "https://hexctl.dev/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://hexctl.dev/#webpage",
      url: "https://hexctl.dev",
      name: "Wayne Obial — Software Developer Portfolio (hexctl.dev)",
      isPartOf: {
        "@id": "https://hexctl.dev/#website",
      },
      about: {
        "@id": "https://hexctl.dev/#person",
      },
      mainEntity: {
        "@id": "https://hexctl.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Preloader minMs={800} />

        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


