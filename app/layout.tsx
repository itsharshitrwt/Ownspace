
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "../providers/ConvexClientProvider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { RedirectToSignIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ownspace",
  description: "A private text based Chat App",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            {/* Display SignInButton when the user is signed out */}
            
            <RedirectToSignIn />
            
            
          </SignedOut>
          <SignedIn>
            {/* Display UserButton when the user is signed in */}
            
          </SignedIn>
          {/* Wrap children with ConvexClientProvider */}
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <ConvexClientProvider>
            <TooltipProvider> {children}</TooltipProvider>
            <Toaster richColors/>
          </ConvexClientProvider>
          </ThemeProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}