import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/lib/helpers";
import { RootState } from "@/store";
import {
  IoFolderOpen,
  IoLogOut,
  IoColorPalette,
  IoCaretDown,
  // IoCrown
} from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import { Avatar } from "@mantine/core";
import { getActiveSubscription } from "@/api/subscriptions";
import Link from "next/link";
import { GiTwoCoins } from "react-icons/gi";
import { clearState } from "@/store/slices/userSlice";

const AvatarMenu = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.user);
  const token = useSelector((state: RootState) => state.user.token);

  const handleLogout = () => {
    logOut();
    dispatch(clearState());
  };

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  });

  const { data: subscriptionData } = useQuery({
    queryKey: ["active-subscription", token],
    queryFn: getActiveSubscription,
    enabled: !!token,
  });

  //  console.log(subscriptionData?.subscription);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px]outline-none hover:bg-violet3 !outline-0 cursor-pointer"
          aria-label="Customise options"
        >
          {/* <HamburgerMenuIcon /> */}
          {/* <Image
            src={userData.avatar}
            width={35}
            height={35}
            alt="Avatar"
            className="size-full rounded-[inherit] object-cover"
          /> */}

          <Avatar color="cyan" radius="xl" size={35} className="uppercase">
            {data?.name?.slice(0, 2)}
          </Avatar>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[280px] rounded-lg bg-white p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
          sideOffset={5}
        >
          {/* User Profile Header */}
          <div className="flex items-center gap-3 p-3 border-b border-gray-100">
            <Avatar color="cyan" radius="xl" size={40} className="uppercase">
              {data?.name?.slice(0, 2)}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {data?.name}
                </h3>
              </div>
              <p className="text-xs">{data?.email}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="py-2">
            <Link href="/projects">
              <DropdownMenu.Item className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-50 data-[highlighted]:bg-gray-50">
                <IoFolderOpen className="w-4 h-4 text-black" />
                Projects
              </DropdownMenu.Item>
            </Link>

            {/* <DropdownMenu.Item
              className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-50 data-[highlighted]:bg-gray-50"
              onClick={() => handleNavigation("/settings")}
            >
              <IoSettings className="w-4 h-4 text-black" />
              Account Settings
            </DropdownMenu.Item> */}

            <Link href="/design">
              <DropdownMenu.Item className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-50 data-[highlighted]:bg-gray-50">
                <IoColorPalette className="w-4 h-4 text-black" />
                Create/Design
              </DropdownMenu.Item>
            </Link>

            {/* <DropdownMenu.Item
              className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm  outline-none cursor-pointer hover:bg-gray-50 data-[highlighted]:bg-gray-50"
              onClick={() => handleNavigation("/activity")}
            >
              <IoStatsChart className="w-4 h-4 " />
              Activity
            </DropdownMenu.Item> */}
          </div>

          <DropdownMenu.Separator className="h-px bg-gray-100 my-2" />

          {/* Plan Information */}
          <div className="px-3 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <IoCaretDown className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {subscriptionData?.subscription?.plan
                    ? subscriptionData?.subscription?.plan
                    : "Free"}{" "}
                  plan
                </span>
              </div>
              <Link
                href="/pricing"
                className="!text-xs text-gray-600 hover:text-black font-medium underline"
                target="_blank"
                // onClick={() => handleNavigation("/pricing")}
              >
                upgrade
              </Link>
            </div>
            <div className="text-sm">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <GiTwoCoins />
                  <span>Credits:</span>
                </div>

                <span className="font-medium">
                  {data?.credits?.toLocaleString()}
                </span>
              </div>
              {/* <div className="flex justify-between mt-1">
                <span>Requests Left:</span>
                <span className="font-medium text-green-600">
                  {data?.credits?.toLocaleString()}
                </span>
              </div> */}
            </div>
          </div>

          <DropdownMenu.Separator className="h-px bg-gray-100 my-2" />

          {/* Logout */}
          <DropdownMenu.Item
            className="group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 outline-none cursor-pointer hover:bg-red-50 data-[highlighted]:bg-red-50"
            onClick={handleLogout}
          >
            <IoLogOut className="w-4 h-4" />
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AvatarMenu;
