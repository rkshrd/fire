import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ['latin'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Thaïs PARISOT — Portfolio",
    description: "Network, System & Cybersecurity Student — BTS SIO SISR Portfolio",
    keywords: ["cybersecurity", "portfolio", "BTS SIO", "SISR", "network", "system"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.className} ${jetbrains.className} antialiased`}>
                <ThemeProvider>
                    <CustomCursor />
                    <ScrollProgress />
                    <ScrollToTop />
                    <Navbar />
                    <main className="pt-14 pb-16 min-h-screen">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
