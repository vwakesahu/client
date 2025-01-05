import React, { useState, useCallback } from "react";
import {
  BellIcon,
  CopyIcon,
  PlusCircle,
  CheckIcon,
  Plus,
  X,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ethers, parseEther } from "ethers";
import {
  LEARN_AND_EARN_PLATFORM_ABI,
  LEARN_AND_EARN_PLATFORM_ADDRESS,
  LEARN_AND_EARN_TOKEN_ABI,
} from "@/utils/contracts";
import { useWalletContext } from "@/privy/walletContext";

const IconButton = ({ Icon, onClick }) => (
  <div className={cn(buttonVariants({ variant: "ghost" }))} onClick={onClick}>
    <Icon />
  </div>
);

const UploadForm = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState("Vivek");
  const [courseDescription, setCourseDescription] = useState("Deummy");
  const [videoLinks, setVideoLinks] = useState(["nsdzcjcs"]);
  const [metadataURI, setMetadataURI] = useState("nabs ac");
  const [isPremium, setIsPremium] = useState(false);
  const [minPurchaseAmount, setMinPurchaseAmount] = useState("0.1");
  const [certificatePrice, setCertificatePrice] = useState("0.05");
  const [basePrice, setBasePrice] = useState("0.2");
  const [scalingFactor, setScalingFactor] = useState("100");

  const handleSubmit = () => {
    const courseParams = {
      name: courseName,
      metadataURI,
      isPremium,
      minPurchaseAmount: ethers.parseEther(minPurchaseAmount),
      certificatePrice: ethers.parseEther(certificatePrice),
      basePrice: ethers.parseEther(basePrice),
      scalingFactor: parseInt(scalingFactor),
      description: courseDescription,
      videos: videoLinks.filter((link) => link.trim() !== ""),
    };
    onSubmit(courseParams);
  };

  const addVideoLink = () => {
    setVideoLinks([...videoLinks, ""]);
  };

  const handleVideoLinkChange = (index, value) => {
    const newLinks = [...videoLinks];
    newLinks[index] = value;
    setVideoLinks(newLinks);
  };

  const removeVideoLink = (index) => {
    if (videoLinks.length > 1) {
      const newLinks = videoLinks.filter((_, i) => i !== index);
      setVideoLinks(newLinks);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm text-gray-600 mb-2 block">Course Name</Label>
        <Input
          placeholder="Enter the name of your course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border-gray-200"
        />
      </div>

      <div>
        <Label className="text-sm text-gray-600 mb-2 block">
          Course Description
        </Label>
        <Textarea
          placeholder="Provide a brief description of your course"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full min-h-24 border-gray-200"
        />
      </div>

      <div>
        <Label className="text-sm text-gray-600 mb-2 block">Metadata URI</Label>
        <Input
          placeholder="IPFS metadata URI"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
          className="w-full border-gray-200"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Label className="text-sm text-gray-600">Premium Course</Label>
        <Switch checked={isPremium} onCheckedChange={setIsPremium} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm text-gray-600 mb-2 block">
            Minimum Purchase Amount (ETH)
          </Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.1"
            value={minPurchaseAmount}
            onChange={(e) => setMinPurchaseAmount(e.target.value)}
            className="w-full border-gray-200"
          />
        </div>

        <div>
          <Label className="text-sm text-gray-600 mb-2 block">
            Certificate Price (ETH)
          </Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.05"
            value={certificatePrice}
            onChange={(e) => setCertificatePrice(e.target.value)}
            className="w-full border-gray-200"
          />
        </div>

        <div>
          <Label className="text-sm text-gray-600 mb-2 block">
            Base Price (ETH)
          </Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.2"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="w-full border-gray-200"
          />
        </div>

        <div>
          <Label className="text-sm text-gray-600 mb-2 block">
            Scaling Factor
          </Label>
          <Input
            type="number"
            placeholder="100"
            value={scalingFactor}
            onChange={(e) => setScalingFactor(e.target.value)}
            className="w-full border-gray-200"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm text-gray-600">Video Links</Label>
          <button
            onClick={addVideoLink}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Video
          </button>
        </div>

        <div className="space-y-3">
          {videoLinks.map((link, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Input
                placeholder="Paste YouTube video URL"
                value={link}
                onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                className="w-full border-gray-200"
              />
              {videoLinks.length > 1 && (
                <button
                  onClick={() => removeVideoLink(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const { address, signer } = useWalletContext();

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [address]);

  const learnAndEarn = async () => {
    const learnAndEarnContract = new ethers.Contract(
      LEARN_AND_EARN_PLATFORM_ADDRESS,
      LEARN_AND_EARN_PLATFORM_ABI,
      signer
    );

    try {
      const tx = await learnAndEarnContract.createCourse(
        "Intro to Blockchain",
        "https://example.com/blockchain-metadata",
        false, // isPremium: Not a premium course
        0, // minPurchaseAmount: No minimum LET purchase requirement
        parseEther("50"), // certificatePrice: 50 LET tokens
        parseEther('1'), // basePrice: 1 LET token
        parseEther('0.1') // scalingFactor: 0.1 LET token
      );

      const receipt = await tx.wait();
      console.log("Course created successfully:", receipt);
      return receipt;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full">
        <IconButton Icon={BellIcon} />
        <AlertDialog>
          <AlertDialogTrigger>
            <div className={cn(buttonVariants({ variant: "ghost" }))}>
              <PlusCircle />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
            <AlertDialogHeader className="px-6 pt-6">
              <AlertDialogTitle className="text-3xl font-light mb-2">
                Launch New Course
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Fill in the course details and add your video content below.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div
              className="px-6 overflow-y-auto flex-1"
              style={{ minHeight: "200px" }}
            >
              <UploadForm onSubmit={learnAndEarn} />
            </div>

            <div className="mt-auto border-t">
              <AlertDialogFooter className="px-6 py-4">
                <AlertDialogCancel className="border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-black hover:bg-gray-900 text-white"
                  onClick={learnAndEarn}
                >
                  Launch Course
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-4 items-center w-full mt-6">
        <Image
          src="/avatar.svg"
          width={100}
          height={100}
          alt="Profile"
          className="rounded-full"
        />

        <div className="flex items-center relative">
          <p className="text-xl font-semibold">{address}</p>
          <div
            className="absolute -right-9 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-all duration-300"
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckIcon size={15} className="text-gray-900 animate-bounce" />
            ) : (
              <CopyIcon size={15} className="text-gray-600" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
