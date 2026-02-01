import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine - The Perfect Way to Propose",
  description:
    "Create a beautiful, personalized digital proposal for your loved one this Valentine's Day. Make your special moment unforgettable with our romantic digital experience.",
  alternates: {
    canonical: "https://valentine-propose.vercel.app",
  },

  keywords: [
    "Valentine's Day",
    "Propose",
    "Love",
    "Digital Proposal",
    "Romance",
    "Digital Card",
    "Valentine 2026",
  ],
  authors: [{ name: "Valentine App" }],
  creator: "Valentine App",
  publisher: "Valentine App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Valentine - The Perfect Way to Propose",
    description:
      "Create a beautiful, personalized digital proposal for your loved one this Valentine's Day.",
    url: "https://valentine.malaymishra.com",
    siteName: "Valentine",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Valentine Proposal Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine - The Perfect Way to Propose",
    description:
      "Create a beautiful, personalized digital proposal for your loved one this Valentine's Day.",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: "/valentine-icon.png",
    apple: "/valentine-icon.png",
  },
};

export const viewport = {
  themeColor: "#ff4d6d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
