import { useState, useCallback } from "react";

export const useProfileForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = useCallback((section, field, e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  return { formData, handleInputChange };
};
