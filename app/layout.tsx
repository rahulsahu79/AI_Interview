import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "InterviewAI - AI-Powered Interview Preparation Platform",
  description:
    "Prepare for your technical and behavioral interviews with AI-generated questions tailored to your resume. Get detailed performance reports and improve your interview skills.",
  keywords: [
    "interview prep",
    "AI interviews",
    "mock interviews",
    "interview preparation",
    "technical interviews",
    "job preparation",
  ],
  openGraph: {
    title: "InterviewAI - Master Your Interviews with AI",
    description:
      "Upload your resume and practice with AI-powered mock interviews tailored to your skills.",
    url: "https://interviewai.com",
    siteName: "InterviewAI",
    images: [
      {
        url: "https://interviewai.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white antialiased">{children}</body>
    </html>
  );
}
