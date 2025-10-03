import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import localFont from "next/font/local";
import "./globals.css";

// import type { Metadata } from "next";
// import { StackProvider, StackTheme } from "@stackframe/stack";
// import { stackServerApp } from "../stack";
// import localFont from "next/font/local";
// import "./globals.css";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "nextjs-crud-auth-postgresql",
  description: "nextjs-crud-auth-postgresql",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackClientApp}><StackTheme>
        <Navbar />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        {/* <StackProvider app={stackServerApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster/>
              <Navbar />
              

              {children}
            </ThemeProvider>
          </StackTheme>
        </StackProvider> */}
      </StackTheme></StackProvider></body>
    </html>
  );
}
