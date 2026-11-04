import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { Atmosphere } from "@/components/site/Atmosphere";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MotionRoot } from "@/components/motion/MotionRoot";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const introScript = `try{var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce||sessionStorage.getItem("bylaw-introduced")==="1"){document.documentElement.setAttribute("data-skip-intro","true");document.documentElement.dataset.ready="true";}}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "BYLAW Academy",
    template: "%s · BYLAW Academy",
  },
  description:
    "Professional online legal courses, practical training, and certifications from practicing lawyers.",
};

export const viewport: Viewport = {
  themeColor: "#f4f0e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[#f3eadc] font-sans text-navy">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <Atmosphere />
        <MotionRoot>
          <Header />
          <main id="content" className="relative z-[1]">
            {children}
          </main>
          <Footer />
        </MotionRoot>
      </body>
    </html>
  );
}
