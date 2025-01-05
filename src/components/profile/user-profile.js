import React, { useState, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  School,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";
import { ProfileHeader } from "./profile-header";
import { InputField } from "./InputField";
import { ProfileSection } from "./ProfileSection";
import { useProfileForm } from "@/hooks/useProfileForm";
import MyCourses from "../dashboard/my-courses";

const initialFormData = {
  personalInfo: {
    fullName: "",
    eduId: "EDU2024ST1245",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  },
  education: {
    degree: "",
    institution: "",
    graduationYear: "",
  },
  certificationDetails: {
    legalName: "",
    identificationNumber: "",
    professionalTitle: "",
  },
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { formData, handleInputChange } = useProfileForm(initialFormData);

  const handleSave = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6">
      <ProfileHeader
        fullName={formData.personalInfo.fullName}
        eduId={formData.personalInfo.eduId}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 gap-8">
        <ProfileSection title="Personal Information">
          <InputField
            icon={User}
            label="Full Name"
            value={formData.personalInfo.fullName}
            onChange={(e) => handleInputChange("personalInfo", "fullName", e)}
            isEditing={isEditing}
          />
          <InputField
            icon={Mail}
            label="Email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange("personalInfo", "email", e)}
            isEditing={isEditing}
          />
          <InputField
            icon={Phone}
            label="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange("personalInfo", "phone", e)}
            isEditing={isEditing}
          />
          <InputField
            icon={Calendar}
            label="Date of Birth"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) =>
              handleInputChange("personalInfo", "dateOfBirth", e)
            }
            isEditing={isEditing}
          />
          <InputField
            icon={MapPin}
            label="Address"
            value={formData.personalInfo.address}
            onChange={(e) => handleInputChange("personalInfo", "address", e)}
            isEditing={isEditing}
          />
        </ProfileSection>

        <ProfileSection title="Education">
          <InputField
            icon={School}
            label="Degree"
            value={formData.education.degree}
            onChange={(e) => handleInputChange("education", "degree", e)}
            isEditing={isEditing}
          />
          <InputField
            icon={School}
            label="Institution"
            value={formData.education.institution}
            onChange={(e) => handleInputChange("education", "institution", e)}
            isEditing={isEditing}
          />
          <InputField
            icon={Calendar}
            label="Graduation Year"
            value={formData.education.graduationYear}
            onChange={(e) =>
              handleInputChange("education", "graduationYear", e)
            }
            isEditing={isEditing}
          />
        </ProfileSection>

        <ProfileSection title="Certificate Information">
          <InputField
            icon={Award}
            label="Legal Name"
            value={formData.certificationDetails.legalName}
            onChange={(e) =>
              handleInputChange("certificationDetails", "legalName", e)
            }
            isEditing={isEditing}
          />
          <InputField
            icon={User}
            label="ID Number"
            value={formData.certificationDetails.identificationNumber}
            onChange={(e) =>
              handleInputChange(
                "certificationDetails",
                "identificationNumber",
                e
              )
            }
            isEditing={isEditing}
          />
          <InputField
            icon={Award}
            label="Professional Title"
            value={formData.certificationDetails.professionalTitle}
            onChange={(e) =>
              handleInputChange("certificationDetails", "professionalTitle", e)
            }
            isEditing={isEditing}
          />
        </ProfileSection>

        <ProfileSection title="My Courses">
          <MyCourses />
        </ProfileSection>
      </div>
    </div>
  );
};

export default UserProfile;
