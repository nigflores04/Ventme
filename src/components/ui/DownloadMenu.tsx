import * as React from "react";
// import { DropdownMenu } from "radix-ui";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Loader } from "@mantine/core";
import { FiDownload } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { downloadImageOutput } from "@/lib/helpers";
import toast from "react-hot-toast";
// import {
// 	HamburgerMenuIcon,
// 	DotFilledIcon,
// 	CheckIcon,
// 	ChevronRightIcon,
// } from "@radix-ui/react-icons";

const DownloadMenu = ({ imageId }: { imageId: string }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");
  const [isDownloading, setIsDownloading] = React.useState(false);

  // const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async (isHighResolution: boolean) => {
    try {
      setIsDownloading(true);
      await downloadImageOutput(imageId, isHighResolution ? 4 : null).finally(
        () => {
          setIsDownloading(false);
        }
      );

      toast.success("Image downloaded successfully!");
    } catch {
      setIsDownloading(false);
      toast.error("Failed to download image");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="bg-black flex items-center justify-center bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 cursor-pointer"
          title="Download"
          disabled={isDownloading}
          onClick={(e) => {
            e.stopPropagation();
          }}
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
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-fit rounded-md bg-white z-50 p-[5px] py-[10px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className="group relative flex select-none items-center cursor-pointer rounded-md px-[10px] py-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(true);
            }}
          >
            High Resolution
            <div className="pl-1 text-gray-500 group-data-[disabled]:text-gray-400 group-data-[highlighted]:text-white">
              (x4)
            </div>
            <FaCrown className="w-4 h-4 text-yellow-500 ml-5" />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="group relative flex select-none items-center rounded-md cursor-pointer  px-[10px] py-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(false);
            }}
          >
            Original Quality
            {/* <div className="pl-1 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
              (Poor quality)
            </div> */}
          </DropdownMenu.Item>

          {/* <DropdownMenu.Item
            className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
            disabled
          >
            New Private Window{" "}
            <div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
              ⇧+⌘+N
            </div>
          </DropdownMenu.Item> */}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DownloadMenu;
