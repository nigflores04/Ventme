"use client";

import React from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiShare2 } from "react-icons/fi";
import { DesignResultInterface } from "@/interface/design";
import { handleShare } from "@/lib/helpers";
import DownloadMenu from "./ui/DownloadMenu";
import { BsStars } from "react-icons/bs";
import { Tooltip } from "@mantine/core";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: DesignResultInterface | null;
  images: DesignResultInterface[];
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
  onProductSearch?: () => void;
}

const ImageModal = ({
  isOpen,
  onClose,
  images,
  selectedImageIndex,
  onImageChange,
  onProductSearch,
}: ImageModalProps) => {
  if (!isOpen || !images.length) return null;

  const currentImage = images[selectedImageIndex];

  const closeModal = () => {
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  const goToPrevious = () => {
    const newIndex =
      selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    onImageChange(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    onImageChange(newIndex);
  };

  return (
    <div
      className="fixed w-full inset-0 bg-black/90 bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Previous button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Image */}
        <div
          className="relative h-[80vh] w-5/5 max-h-[90vh] rounded-3xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[selectedImageIndex].output || "/placeholder.svg"}
            alt={images[selectedImageIndex].prompt}
            // fill
            className="object-contain w-full h-full"
          />
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="bg-black flex items-center justify-center bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
            title="Download"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader
                color="white"
                size={14}
                width={20}
                height={20}
                className="mx-auto"
              />
            ) : (
              <FiDownload className="w-5 h-5" />
            )}
          </button> */}

          <Tooltip label="Search products" className="bg-black">
            <button
              // variant="outline"
              // size="sm"
              // className=" flex items-center justify-center rounded-[12px] !py-[6px]"
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
              onClick={onProductSearch}
              // onClick={() => setFieldValue("prompt", templatePrompt)}
            >
              <BsStars className="w-4 h-4" />
              {/* <span className="ml-2 text-sm font-medium">Search products</span> */}
            </button>
          </Tooltip>

          <DownloadMenu imageId={currentImage.id} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(
                "Ventics AI - Interior Design",
                `${window.location.href}/${currentImage.id}/view`
              );
            }}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
            title="Share"
          >
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
