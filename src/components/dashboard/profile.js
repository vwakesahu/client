import React, { useState, useCallback } from 'react';
import { BellIcon, CopyIcon, PlusCircle, CheckIcon, Plus, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
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
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const IconButton = ({ Icon, onClick }) => (
  <div className={cn(buttonVariants({ variant: "ghost" }))} onClick={onClick}>
    <Icon />
  </div>
);

const UploadForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [videoLinks, setVideoLinks] = useState(['']);

  const addVideoLink = () => {
    setVideoLinks([...videoLinks, '']);
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
    <div className="space-y-8">
      <div>
        <label className="text-sm text-gray-600 mb-2 block">
          Course Name
        </label>
        <Input
          placeholder="Enter the name of your course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border-gray-200"
        />
      </div>
      
      <div>
        <label className="text-sm text-gray-600 mb-2 block">
          Course Description
        </label>
        <Textarea
          placeholder="Provide a brief description of your course"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="w-full min-h-24 border-gray-200"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">Video Links</label>
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
            <div 
              key={index} 
              className="flex gap-3 items-center"
            >
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
  const address = "0x12435...5648";

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [address]);

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
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl font-light mb-2">
                Launch New Course
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Fill in the course details and add your video content below.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="py-8">
              <UploadForm />
            </div>
            
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-black hover:bg-gray-900 text-white">
                Launch Course
              </AlertDialogAction>
            </AlertDialogFooter>
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