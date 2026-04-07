import { Analytics } from "@vercel/analytics/react";
import "./globals.css"; // This keeps your Tailwind styling intact!

export const metadata = {
  title: 'Kosi Jobs | Madhepura, Saharsa, Supaul Job Portal',
  description: 'Daily updates for Government, Private, Block, and Panchayat jobs in the Kosi Division of Bihar. Find vacancies in Alstom, Jeevika, and local Hospitals.',
  keywords: 'Madhepura jobs, Saharsa recruitment, Supaul govt jobs, Bihar Panchayat jobs, Kosi Division vacancies, Alstom Madhepura careers, Bihar Health Society jobs',
  authors: [{ name: 'Jamuna' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics /> {/* This is the tracker silently working in the background */}
      </body>
    </html>
  );
}