"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
import {
  FiImage,
  FiFolder,
  FiShare2,
  FiGrid,
  FiArrowRight,
  FiHeart,
  FiSettings,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { generateDesigns } from "@/api/design";
import { useFormik } from "formik";
import { Skeleton } from "@mantine/core";
import { DesignResultInterface } from "@/interface/design";
import ImageModal from "@/components/ImageModal";
import DesignBar from "@/components/DesignBar";
import Avatar from "@/components/AvatarMenu";
import { getToken } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { createProject } from "@/api/project";
import Image from "next/image";
import { BsStars } from "react-icons/bs";
import { getTemplateOptions } from "@/constants";
import ProductDrawer from "@/components/ProductDrawer";
import { useDisclosure } from "@mantine/hooks";

export default function DesignWorkspace({
  workspaceId,
}: {
  workspaceId?: string;
}) {
  const [selectedImage, setSelectedImage] =
    useState<DesignResultInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [results, setResults] = useState<DesignResultInterface[]>([]);
  const [projectId, setProjectId] = useState<string | null>(workspaceId!);
  const [isDesignBarOpen, setIsDesignBarOpen] = useState(true);
  const [opened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const router = useRouter();

  const styleOptions = [
    {
      label: "Make it cozy",
      value: "make_it_cozy",
    },
    {
      label: "Add more natural light",
      value: "add_more_natural_light",
    },
    {
      label: "Maximize space",
      value: "maximize_space",
    },
    {
      label: "Add Art / Wall Decor",
      value: "add_art_wall_decor",
    },
    {
      label: "Add Indoor Plants",
      value: "add_indoor_plants",
    },
    {
      label: "Child-Friendly Design",
      value: "child_friendly_design",
    },
    {
      label: "Reduce Clutter",
      value: "reduce_clutter",
    },
  ];

  // Project creation mutation
  const { mutate: mutateCreateProject } = useMutation({
    mutationFn: createProject,
    onSuccess: (res) => {
      // console.log(res?.project);
      const newProjectId = res?.project?.id || res?.id || res?.projectId;
      if (newProjectId) {
        localStorage.setItem("projectId", newProjectId);
        // router.replace(`/design/${newProjectId}`, { scroll: false });
        router.replace(`/design/${newProjectId}`, { scroll: false });

        setProjectId(newProjectId);
        // toast.success("Project created successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
    },
  });

  const { mutate: mutateGenerateDesigns, isPending: isGeneratingDesigns } =
    useMutation({
      mutationFn: generateDesigns,
      onSuccess: (res) => {
        localStorage.setItem("designs", JSON.stringify(res));
        setResults(res?.variations);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    });

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      // prompt: "Completely remodel this room",
      prompt: "",
      image: null,
      roomType: "",
      stylePreset: "",
    },
    onSubmit: (values: any) => {
      // Include projectId in the design generation request if available
      const designData = {
        ...values,
        projectId: projectId,
      };
      mutateGenerateDesigns(designData);
    },
  });

  const templatePrompt = useMemo(() => {
    return getTemplateOptions(values?.roomType, values?.stylePreset);
  }, [values?.roomType, values?.stylePreset]);

  const isButtonDisabled = useMemo(() => {
    return isGeneratingDesigns || !values.image || values.roomType == "";
  }, [isGeneratingDesigns, values]);

  // Check for existing project ID on page load and create project if needed
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.back();
      return;
    }

    // const existingProjectId = localStorage.getItem("projectId");
    const existingDesigns = localStorage.getItem("designs");

    if (existingDesigns) {
      const designResult = JSON.parse(existingDesigns);
      setResults(designResult.variations);
      setFieldValue("prompt", designResult?.prompt);
      setFieldValue("roomType", designResult?.room_type);
      setFieldValue("stylePreset", designResult?.style_preset);
      setFieldValue("image", designResult?.variations[0].reference);
      setProjectId(designResult?.project_id);
    } else if (!workspaceId) {
      // Create a new project if none exists
      const defaultProjectData = {
        name: `Design Project ${new Date().toLocaleDateString()}`,
        description: "",
        referenceImage: "",
        prompt: values.prompt,
        roomType: values.roomType,
        stylePreset: values.stylePreset,
      };
      mutateCreateProject(defaultProjectData);
    }
  }, [router, mutateCreateProject]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("projectId");
    };
  }, []);

  return (
    <div className="h-screen flex relative">
      {/* Design Panel Sidebar */}
      <div
        className={`
          fixed md:relative z-30 md:z-auto
          transition-transform duration-300 ease-in-out
          h-full
          ${isDesignBarOpen ? "translate-x-0" : "-translate-x-full !absolute"}
        `}
        style={{
          willChange: "transform",
          pointerEvents: isDesignBarOpen ? "auto" : "none",
        }}
        aria-hidden={!isDesignBarOpen}
      >
        <DesignBar values={values} setFieldValue={setFieldValue} />
      </div>

      {/* Mobile Overlay */}
      {isDesignBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsDesignBarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="bg-transparent border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Design Bar Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                className={`border-gray-300 bg-transparent transition-colors `}
                onClick={() => setIsDesignBarOpen(!isDesignBarOpen)}
                title={
                  isDesignBarOpen ? "Hide design panel" : "Show design panel"
                }
              >
                {/* <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4" /> */}
                <FiSettings className="w-4 h-4" />
                <span className="ml-2 text-xs hidden sm:inline">
                  {isDesignBarOpen ? "Hide Config" : "Show Config"}
                </span>
              </Button>

              <Image
                src="/images/logo-white.jpg"
                alt="Ventics AI"
                width={50}
                height={50}
                className=" object-cover rounded-lg mx-auto"
              />

              {/* <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                EXPERIMENT
              </Badge> */}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-transparent !hidden"
              >
                <FiFolder className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-transparent"
                disabled={results?.length === 0}
              >
                <FiShare2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-transparent !hidden"
              >
                <FiHeart className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-transparent !hidden"
              >
                <FiGrid className="w-4 h-4" />
              </Button>
              <div className=" items-center gap-2 ml-4 hidden">
                <span className="text-sm font-medium">MY LIBRARY</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 bg-transparent hidden"
                >
                  <FiSettings className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
              <Avatar />
            </div>
          </div>
        </header>

        {/* Central Workspace */}
        <div className="flex-1 relative ">
          {isGeneratingDesigns ? (
            <div className="md:w-full px-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <Skeleton height={500} radius="xl" />
              <Skeleton height={500} radius="xl" />
              <Skeleton height={500} radius="xl" />
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
                    className="w-full h-[300px] md:h-[500px] object-cover rounded-xl hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FiImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your workspace</p>
                <p className="text-sm">
                  Upload images and enter prompts to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="px-8 p-8">
          <div className="max-w-4xl mx-auto">
            {/* {results.length > 0 && (
              <div className="w-full flex items-center gap-3 mb-4 overflow-x-auto scrollbar-hide">
                {styleOptions.map((option) => (
                  <div
                    key={option.value}
                    className="relative bg-[#F3F4F6] rounded-full px-4 py-2 text-sm cursor-pointer text-[#374151] text-semibold whitespace-nowrap"
                    onClick={() => setFieldValue("stylePreset", option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )} */}
            <div className=" border border-gray-300 rounded-2xl p-3 relative ">
              {/* <Textarea
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                placeholder="Describe the space you want to create..."
                className="border-0 resize-none text-base leading-relaxed min-h-[80px] focus:ring-0 focus:outline-none"
              /> */}

              <textarea
                placeholder="Describe the space you want to create..."
                // placeholder="Replace the existing light fixture with a modern brass chandelier. Change the blue sofa to a vintage. The room should feel warm and inviting, with a cozy atmosphere perfect for reading..."
                className="border-0 resize-none text-base leading-relaxed w-full min-h-[80px] h-full focus:ring-0 focus:outline-none"
                value={values.prompt}
                onChange={handleChange}
                name="prompt"
              />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="!bg-[#F3F4F6] rounded-2xl  bottom-1 left-3"
                  onClick={() => setFieldValue("prompt", templatePrompt)}
                >
                  <BsStars className="w-4 h-4" />
                  <span className="ml-2 text-sm">Use template</span>
                </Button>
                <div className="flex items-center justify-end  bottom-3 right-3">
                  <Button
                    type="button"
                    className="bg-black hover:bg-gray-800 text-white rounded-2xl w-8 h-8 !p-0"
                    onClick={() => handleSubmit()}
                    isLoading={isGeneratingDesigns}
                    disabled={isButtonDisabled}
                  >
                    <FiArrowRight className="!w-3 !h-3" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-200/50 px-8 py-3 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>
              <div className="text-gray-400 text-xs">© 2025 Ventics AI</div>
            </span>
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-800 text-gray-400 text-xs">
                Privacy
              </button>
              <button className="hover:text-gray-800 text-gray-400 text-xs">
                Terms of Service
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Action Button for Mobile */}
      {!isDesignBarOpen && (
        <div className="fixed bottom-6 left-6 z-40 md:hidden">
          <Button
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
            onClick={() => setIsDesignBarOpen(true)}
            title="Show design configuration"
          >
            <FiSettings className="w-6 h-6" />
          </Button>
        </div>
      )}

      <ProductDrawer
        opened={opened}
        close={closeDrawer}
        url={selectedImage?.output}
      />
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={selectedImage}
        images={results}
        selectedImageIndex={selectedImageIndex}
        onImageChange={setSelectedImageIndex}
        onProductSearch={openDrawer}
      />
    </div>
  );
}
