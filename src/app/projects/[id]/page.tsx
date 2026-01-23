"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Button from "@/components/ui/button";
import { DesginGenerationInterface } from "@/interface/project";
import { FiArrowLeft, FiFolder, FiEye, FiDownload, FiHeart, FiShare2 } from "react-icons/fi";
import { getProjectById } from "@/api/project";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import AvatarMenu from "@/components/AvatarMenu";
import ImageModal from "@/components/ImageModal";
import { DesignResultInterface } from "@/interface/design";

const ProjectDesigns = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
// console.log(projectId);
  // Fetch specific project data
  const {
    data: designData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project-designs", projectId],
    queryFn: () => getProjectById(projectId),
    // enabled: !!projectId,
  });


  const projectData = designData?.project;
  const designs = projectData?.generations;
  
  // Convert designs to DesignResultInterface format for ImageModal
  const modalImages: DesignResultInterface[] = designs?.map((design: DesginGenerationInterface) => ({
    id: design.id,
    output: design.output,
    prompt: design.prompt,
    // Add other required fields with default values
    // input: design.input || '',
    status: 'completed',
    // createdAt: design.createdAt || new Date().toISOString(),
    // updatedAt: design.updatedAt || new Date().toISOString(),
  })) || [];


  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  const getLayoutClasses = (position: number) => {
    if (position === 0) return "md:col-span-2 h-64 md:h-[450px]"; // Large horizontal top-left
    if (position === 1) return "md:col-span-1 h-64 md:h-[450px]"; // Square top-right
    if (position >= 2 && position <= 4)
      return "md:col-span-1 h-48 md:h-[450px]"; // Middle row
    if (position === 5) return "md:col-span-1 h-48 md:h-[450px]"; // Bottom left
    if (position === 6) return "md:col-span-2 h-48 md:h-[450px]"; // Large horizontal bottom-right
    return "md:col-span-1 h-48 md:h-[450px]"; // Default for additional images
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex">
        <div className="w-64 bg-gray-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen flex">
        <div className="w-64 bg-gray-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Project not found or failed to load
            </p>
            <Button onClick={() => router.back()} className="!text-sm">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className=" border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-300 text-gray-700 p-2 rounded-lg"
              >
                <FiArrowLeft className="w-4 h-4" />
              </Button>
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-gray-900">
                  {projectData.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {projectData.room_type} • {projectData.style_preset} •{" "}
                  {projectData.generationCount} designs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="!hidden">
                <FiHeart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="!text-sm">
                <FiShare2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="!text-sm gap-1" disabled>
                <FiDownload className="!text-sm" />
                <span>Download All</span>
              </Button>

              <AvatarMenu />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {designs && designs.length > 0 ? (
            <>
              <div className="flex items-center justify-between w-full mb-5">
                {" "}
                <h3 className="text-xl font-bold text-gray-900 ">Designs</h3>
                <Button
                  className="!text-sm gap-1"
                  onClick={() => {
                    router.push(`/design`);
                    localStorage.setItem("projectId", projectId);
                  }}
                >
                  {/* <FiDownload className="!text-sm" /> */}
                  <span>New Design</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-max">
                {designs.map(
                  (generation: DesginGenerationInterface, index: number) => (
                    <div
                      key={generation.id}
                      className={getLayoutClasses(index % 7)}
                    >
                      <div
                        className="relative overflow-hidden rounded-2xl group cursor-pointer w-full h-full"
                        onClick={() => openModal(index)}
                      >
                        <img
                          src={generation?.output}
                          alt={`Design ${index + 1}`}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                              <FiEye className="w-5 h-5 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFolder className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No designs yet
              </h3>
              <p className="text-gray-500 mb-6">
                This project doesn&apos;t have any generated designs yet.
              </p>
              <Link href="/design">
                <Button className="!text-sm">Generate Designs</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={modalImages[selectedImageIndex] || null}
        images={modalImages}
        selectedImageIndex={selectedImageIndex}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default ProjectDesigns;