// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import VintageCursor from "@/components/Global/VintageMouse";

// Define the retro font
const retro = localFont({
  src: "./fonts/Retro.ttf",
  variable: "--font-retro",
});

export const metadata = {
  title: "Pratik Pendurkar",
  description: "Portfolio",
  icons: {
    icon: "/favicon/favicon-32x32",
    shortcut: "/favicon/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${retro.variable} antialiased`}>
        {children}
        <VintageCursor />
      </body>
    </html>
  );
}
