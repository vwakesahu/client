import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import PrivyWrapper from "@/privy/privyProvider";
import { FHEWrapper } from "@/fhevm/fheWrapper";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Learn And Earn",
  description: "Confidential Certificates made easy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
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