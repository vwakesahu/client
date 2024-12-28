"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IceCream, Github, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/announcement";
import { FadeIn } from "@/components/fade-in";
import { FeaturesSection } from "@/components/feature-section";
import { LatestComponentVertical } from "@/components/featured-component";
import { PlugCardGrid } from "@/components/plug-grid";
import { TemplateGrid } from "@/components/cult-components/template-grid";
import { PageActions, PageHeader } from "@/components/page-header";
import { GradientHeading } from "@/components/ui/gradient-heading";
import Navbar from "@/components/site-header";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFullscreen } from "@/hooks/use-fullscreen";

const Page = () => {
  const isMobile = useIsMobile();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isAnnouncementSticky, setIsAnnouncementSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const announcementElement = document.getElementById("main-announcement");
      if (announcementElement) {
        const rect = announcementElement.getBoundingClientRect();
        setIsAnnouncementSticky(rect.top <= 64); // 64px for navbar height
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobile && !isFullscreen) {
      toggleFullscreen();
    }
  }, [isMobile]);

  return (
    <>
      <Navbar />
      {isAnnouncementSticky && (
        <div className="fixed top-4 left-0 right-0 z-[99999] pb-4 border-b border-black/5 transition-all duration-300">
          <div className="max-w-screen-2xl mx-auto">
            <Announcement />
          </div>
        </div>
      )}
      <div className="isolate min-h-screen overflow-hidden pb-8 sm:pb-12 md:pb-0">
        <div className="relative pt-12 md:pt-8">
          <PageHeader>
            <FadeIn>
              <div
                id="main-announcement"
                className={`transition-opacity duration-300 ${
                  isAnnouncementSticky ? "opacity-0" : "opacity-100"
                }`}
              >
                <Announcement />
              </div>
            </FadeIn>
            <FadeIn>
              <div className="pt-4 md:pt-4">
                <GradientHeading
                  weight="bold"
                  className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl"
                >
                  Redefining
                </GradientHeading>
                <GradientHeading
                  size="xll"
                  weight="bold"
                  className="text-center text-xl font-bold tracking-tighter lg:leading-[0.5rem]"
                >
                  <br className="hidden md:block" /> Certificates
                </GradientHeading>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex max-w-2xl flex-wrap items-center justify-center gap-1 text-left text-base  text-foreground md:pt-8 md:text-xl md:font-normal md:leading-6">
                <span className="text-center">
                  At Certify Labs, we're revolutionizing certification with
                  cutting-edge privacy and access control, powered by Fully
                  Homomorphic Encryption (FHE) and advanced symmetric
                  algorithms.
                </span>
              </div>
            </FadeIn>
            <FadeIn>
              <PageActions>
                <Link href="/dashboard/home" className={cn(buttonVariants())}>
                  Get Started
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={"https://github.com/Certify-Labs/docs"}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </PageActions>
            </FadeIn>
          </PageHeader>

          <FadeIn>
            <section className="w-full space-y-4 md:block">
              <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
                <LatestComponentVertical />
              </div>

              <div className="mx-auto max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm">
                <TemplateGrid />
              </div>

              <div className="mx-auto max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-b-[44px] md:rounded-t-[20px]">
                <PlugCardGrid />
              </div>
            </section>
          </FadeIn>
        </div>
        <section className="mt-12 hidden w-full md:block">
          <FadeIn>
            <div className="relative mx-auto max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-[44px]">
              <Badge
                variant="outline"
                className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
              >
                <IceCream className="fill-[#A3C0E0] stroke-1 text-neutral-800" />{" "}
                Component Preview
              </Badge>
              <FeaturesSection />
            </div>
          </FadeIn>
        </section>
      </div>
    </>
  );
};

export default Page;
