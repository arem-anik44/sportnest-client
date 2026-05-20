import { Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SportNest - Sports Facility Booking",
  description: "Book football turfs, badminton courts, swimming lanes, tennis courts and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rajdhani.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
