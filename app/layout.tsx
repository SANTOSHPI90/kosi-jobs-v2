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

export const metadata = {
  title: 'Kosi Jobs | Madhepura, Saharsa, Supaul Job Portal',
  description: 'Daily updates for Government, Private, Block, and Panchayat jobs in the Kosi Division of Bihar. Find vacancies in Alstom, Jeevika, and local Hospitals.',
  keywords: 'Madhepura jobs, Saharsa recruitment, Supaul govt jobs, Bihar Panchayat jobs, Kosi Division vacancies, Alstom Madhepura careers, Bihar Health Society jobs',
  authors: [{ name: 'Jamuna' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
