import "./globals.css";

// Font loading note: this build environment has no access to
// fonts.googleapis.com, so next/font/google can't fetch Fraunces /
// JetBrains Mono / Inter here. Swapped for system stacks that give the
// same serif-display / mono / sans roles (see globals.css). On a machine
// with normal internet access you can restore next/font/google with:
//
//   import { Fraunces, JetBrains_Mono, Inter } from "next/font/google";
//   const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["400","500","600"], style: ["normal","italic"] });
//   const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400","500"] });
//   const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400","500","600"] });
//
// then add `${fraunces.variable} ${jetbrains.variable} ${inter.variable}`
// back onto the <html> className below.

export const metadata = {
  title: "Michael Stefano Pereira — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, Node.js and AI-powered applications. BCA graduate pursuing MCA at Christ University, Bangalore.",
  keywords: [
    "Michael Pereira",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "AI Applications",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
