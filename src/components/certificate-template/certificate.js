import React, { useRef } from "react";
import Nav from "./cert-nav";
import CertificateSVG from "./certificate-svg";
import { Button } from "../ui/button";
import { DownloadIcon, Link as CopyLinkSVG, Share2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = () => {
  const certificateRef = useRef(null);

  const downloadPDF = () => {
    const input = certificateRef.current;
    html2canvas(input, {
      backgroundColor: null,
      scale: 2, // Increase scale for better quality
      logging: false,
      useCORS: true,
      removeContainer: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
  };

  const copyLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareCertificate = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "My Certificate",
          text: "Check out my certificate!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      alert(
        "Web Share not supported on this browser, please copy the link and share manually."
      );
    }
  };

  return (
    <div>
      <div className="md:h-[60%] h-[45%] rounded-3xl px-4">
        {/* <Nav /> */}
        <div className="grid place-items-center mt-20">
          <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-center">
            Here's your certificate! 🎉
          </p>
          <div className="relative mt-10 w-full max-w-[90vw] md:max-w-[700px]">
            <div className="z-50 aspect-[5/3] w-full bg-white rounded-3xl shadow-md p-1.5">
              <div className="border rounded-3xl border-dotted overflow-hidden">
                <div ref={certificateRef} className="">
                  <CertificateSVG />
                </div>
              </div>
            </div>
            <div className="mt-8 w-full flex items-center justify-between">
              <div>
                <Button onClick={downloadPDF}>
                  <DownloadIcon size={16} />{" "}
                  <p className="ml-2">Download PDF</p>
                </Button>
                <Button variant="ghost" onClick={copyLink}>
                  <CopyLinkSVG size={16} /> <p className="ml-2">Copy Link</p>
                </Button>
              </div>
              <div>
                <Button variant="ghost" onClick={shareCertificate}>
                  <Share2 size={16} />{" "}
                  <p className="ml-2">Share Your Certificate</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
