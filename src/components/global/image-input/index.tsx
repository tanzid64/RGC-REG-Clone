"use client";
import { UploadIcon } from "@/icons/client-reg-icons";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { Label } from "../label";

interface ImageInputProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  labelText: string;
  setValue: (name: string, value: any) => void;
}

export const ImageInput: FC<ImageInputProps> = ({
  name,
  register,
  control,
  setValue,
  labelText,
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const file = useWatch({ control, name: name });

  useEffect(() => {
    // Check if `companyLogo` exists and is an array with at least one `File`
    if (file && file.length > 0 && file[0] instanceof File) {
      const imgUrl = URL.createObjectURL(file[0]);
      setLogoPreview(imgUrl);

      // Cleanup previous URL object to avoid memory leaks
      return () => {
        if (imgUrl) {
          URL.revokeObjectURL(imgUrl);
        }
      };
    } else {
      setLogoPreview(null); // Reset preview if no file
    }
  }, [file]);

  const handleRemoveImage = () => {
    setLogoPreview(null); // Clear preview
    setValue(name, null); // Clear the form value in hook-form
  };

  return (
    <>
      {logoPreview ? (
        <div className="relative h-1/6 w-1/6">
          <Image
            alt="img_preview"
            width="100"
            height="100"
            className="rounded-md"
            src={logoPreview}
          />
          <svg
            onClick={handleRemoveImage}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="absolute left-1 top-1 h-5 w-5 cursor-pointer rounded-full bg-white text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      ) : (
        <>
          <Label text={labelText} />
          <div className="flex w-40 items-center justify-start">
            <label
              htmlFor={name}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-violet-300 p-6"
            >
              <UploadIcon className="h-8 w-8 rounded-lg text-violet-600" />
              <input
                id={name}
                className="hidden"
                type="file"
                {...register(name)}
              />
            </label>
          </div>
        </>
      )}
    </>
  );
};
