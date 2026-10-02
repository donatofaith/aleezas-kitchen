import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mobile-nav.css";
import "./desktop-mode-fix.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aleeza's Kitchen | Meals Made With Love",
    template: "%s | Aleeza's Kitchen",
  },
  description:
    "Aleeza's Kitchen in Ibadan serves freshly prepared meals, preordered meals, takeaway and delivery, with cooking classes by Chef Aleeza.",
  applicationName: "Aleeza's Kitchen",
  keywords: [
    "Aleeza's Kitchen",
    "restaurant in Ibadan",
    "Oluyole restaurant",
    "food delivery Ibadan",
    "preordered meals Ibadan",
    "Chef Aleeza",
  ],
  icons: {
    icon: [
      {
        url: "/images/brand/aleeza-logo.png",
        type: "image/png",
      },
    ],
    shortcut: "/images/brand/aleeza-logo.png",
    apple: "/images/brand/aleeza-logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#d90909",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
