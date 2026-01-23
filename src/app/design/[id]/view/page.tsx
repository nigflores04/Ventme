"use client";

import type React from "react";
import { useState } from "react";
import Button from "@/components/ui/button";

import { FiX, FiArrowRight, FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchDesign } from "@/api/design";
import { useFormik } from "formik";
import { Skeleton } from "@mantine/core";
import { DesignResultInterface } from "@/interface/design";

import { useParams } from "next/navigation";
import Image from "next/image";

export default function DesignWorkspace() {
  const { id } = useParams();

  const [selectedImage, setSelectedImage] =
    useState<DesignResultInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [results, setResults] = useState<DesignResultInterface[]>([]);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      prompt:
        "Completely remodel this room to have an elegant feel, using rich jewel tones for the new design",
      image: null,
      roomType: "",
      stylePreset: "",
    },
    onSubmit: (values: any) => {
      //   mutateGenerateDesigns(values);
    },
  });

  const { data: designData, isLoading: isLoadingDesign } = useQuery({
    queryKey: ["design", id],
    queryFn: () => fetchDesign(id as string),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-transparent  px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-white.jpg"
                alt="Ventics AI"
                width={50}
                height={50}
                className=" object-cover rounded-lg mx-auto"
              />
            </div>
          </div>
        </header>

        {/* Central Workspace */}
        <div className="flex-1 relative">
          {isLoadingDesign ? (
            <div className="md:w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <Skeleton height={500} radius="xl" />
              <Skeleton height={500} radius="xl" />
              <Skeleton height={500} radius="xl" />
            </div>
          ) : designData?.output ? (
            <div className="md:w-full h-[80vh] px-5 mx-auto grid grid-cols-1 gap-8 pt-8">
              <div
                key={0}
                className="w-fit h-full cursor-pointer mx-auto"
                onClick={() => {
                  setSelectedImage(designData);
                  setSelectedImageIndex(0);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={designData?.output}
                  alt=""
                  className="w-fit h-[80vh] object-contain rounded-xl hover:opacity-90 transition-opacity "
                />
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="md:w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {results.map((e: DesignResultInterface, index: number) => (
                <div
                  key={index}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setSelectedImage(e);
                    setSelectedImageIndex(index);
                    setIsModalOpen(true);
                  }}
                >
                  <img
                    src={e.output}
                    alt=""
                    className="w-full h-[500px] object-cover rounded-xl hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* Bottom Input Area */}
        <div className="bg-gray-200 px-8 pb-8 hidden">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-6">
              <textarea
                placeholder="Replace the existing light fixture with a modern brass chandelier. Change the blue sofa to a vintage. The room should feel warm and inviting, with a cozy atmosphere perfect for reading..."
                className="border-0 resize-none text-base leading-relaxed w-full min-h-[80px] focus:ring-0 focus:outline-none"
                value={values.prompt}
                onChange={handleChange}
                name="prompt"
              />

              <div className="flex items-center justify-end mt-4">
                <Button
                  type="button"
                  className="bg-black hover:bg-gray-800 text-white rounded-full w-10 h-10 p-0"
                  onClick={() => handleSubmit()}
                  //   isLoading={isGeneratingDesigns}
                  //   disabled={isGeneratingDesigns}
                >
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-200 px-8 py-3 border-t border-gray-200 ">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Ventics AI</span>
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-800">Privacy</button>
              <button className="hover:text-gray-800">Terms of Service</button>
            </div>
          </div>
        </footer>
      </div>

      {/* Unique Image Modal for this component */}
      {isModalOpen && designData?.output && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsModalOpen(false);
            }
          }}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 z-10"
            title="Close"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] rounded-lg "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={designData.output}
              alt={designData.prompt || "AI Generated Design"}
              className="w-fit h-[90vh] object-contain rounded-lg"
            />
          </div>

          {/* Action buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
                window.open(designData.output, "_blank");
              }}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
              title="Download"
            >
              <FiDownload className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
