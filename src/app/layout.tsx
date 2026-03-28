import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/ModalProvider";
import AiWebsiteAgent from "@/components/global/ai-website-agent";

const font = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratos",
  description: "All in one Agency Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-portfolio" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme-flavor");if(t){document.documentElement.className=document.documentElement.className.replace(/theme-[\\w-]+/g,"");document.documentElement.classList.add("theme-"+t)}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${font.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
            {/* <AiWebsiteAgent /> */}
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
