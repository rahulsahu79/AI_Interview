import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:wght@700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
