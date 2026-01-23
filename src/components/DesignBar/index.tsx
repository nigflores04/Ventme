import React, { useState } from "react";
import Toggle from "../ui/toggle";
import { Select } from "@mantine/core";
import { roomStyles, roomTypes } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/api/file";
import toast from "react-hot-toast";
import { DesignBarProps } from "@/interface/design";

const DesignBar = ({ values, setFieldValue }: DesignBarProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const { mutate: mutateUploadFile, isPending: isUploadingFile } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (res) => {
      setFieldValue("image", res?.url);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0];
    // if(file){
    // const objectURL = URL.createObjectURL(file);
    // setUploadedImage(objectURL);
    // }

    const files = event.target.files;

    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target?.result as string);
          if (newImages.length === files.length) {
            setUploadedImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (files?.[0]) {
      mutateUploadFile(files?.[0]);
    }
  };
  return (
    <div className="h-full w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto p-4">
      <Toggle />

      {/* Reference Section */}
      <div className="border-b border-gray-200 mt-10">
        <h3 className="text-sm font-medium text-card-foreground mb-4">
          Reference
        </h3>

        {/* Uploaded Images Display */}
        {(uploadedImages.length > 0 || isUploadingFile) && (
          <div className="mt-4 mb-4">
            <div className="flex flex-wrap gap-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative bg-muted rounded-lg p-1 ">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Uploaded ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      const newImages = uploadedImages.filter(
                        (_, i) => i !== index
                      );
                      setUploadedImages(newImages);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs hover:bg-destructive/90"
                  >
                    ×
                  </button>

                  {/* If uploading, show the progress overlay on top of the most recent image */}
                  {isUploadingFile && index === uploadedImages.length - 1 && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg z-10">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-muted-foreground border-t-primary mb-1"></div>
                      <span className="text-xs text-white mb-1">
                        Uploading...
                      </span>
                      <div className="w-16 bg-muted rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full animate-pulse"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Upload Buttons */}
        <div className="space-y-2 mb-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploadedImages.length >= 1}
            />
            <div className="w-full h-[40px] flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Add image
            </div>
          </label>

          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Browse gallery
          </button>
        </div>
      </div>

      {/* Effects Section */}
      <div className="border-b border-gray-200 hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-card-foreground">Effects</h3>
          <button className="text-muted-foreground hover:text-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Effect Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            All
          </button>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">
            Popular
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Movements
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Themes
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Techniques
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Effects
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Materials
          </button>
          <button className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs hover:bg-muted/80">
            Concepts
          </button>
        </div>

        {/* Effect Options Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">Minimalism</span>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">Scandinavian</span>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">Simple</span>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">Flat design</span>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">Anime</span>
          </div>
          <div className="text-center">
            <div className="aspect-square bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg mb-2"></div>
            <span className="text-xs text-muted-foreground">
              Doodle draw...
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Select
          placeholder="Choose room type"
          data={roomTypes}
          value={values.roomType}
          onChange={(value) => setFieldValue("roomType", value)}
          className="border-gray-200"
          label="Room type"
        />
        <Select
          placeholder="Choose room style"
          data={roomStyles}
          value={values.stylePreset}
          onChange={(value) => setFieldValue("stylePreset", value)}
          className="border-gray-200"
          label="Room style"
        />
      </div>

      {/* Color and Tone Section */}
      <div className="border-b border-gray-200 hidden">
        <h3 className="text-sm font-medium text-card-foreground mb-4">
          Color and tone
        </h3>
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-card-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
            </div>
            <span className="text-sm text-card-foreground">None</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Lighting Section */}
      <div className="hidden">
        <h3 className="text-sm font-medium text-card-foreground mb-4">
          Lighting
        </h3>
        <div className="h-12 bg-muted rounded-lg"></div>
      </div>
    </div>
  );
};

export default DesignBar;
