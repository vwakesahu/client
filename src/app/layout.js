import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import PrivyWrapper from "@/privy/privyProvider";
import { FHEWrapper } from "@/fhevm/fheWrapper";

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

export const metadata = {
  title: "Certify Blocks",
  description: "Confidential Certificates made easy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
          {/* <Navbar /> */}
          <PrivyWrapper>
            <FHEWrapper>
              <>
                <main className="flex-1">{children}</main>
                <SiteFooter />
              </>
            </FHEWrapper>
          </PrivyWrapper>
        </>
      </body>
    </html>
  );
}
