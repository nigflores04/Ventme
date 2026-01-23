import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

const Toggle = () => (
  <ToggleGroup.Root
    className="inline-flex bg-gray-200 rounded-full p-1 w-fit mx-auto"
    type="single"
    defaultValue="design"
    aria-label="Acceleration mode"
  >
    <ToggleGroup.Item
      className="px-4 py-2 rounded-full !text-[12px] font-medium transition-all duration-200 data-[state=on]:bg-white data-[state=on]:text-black data-[state=on]:shadow-sm text-gray-600 hover:text-black cursor-pointer"
      value="design"
      aria-label="design"
      disabled
    >
      Design
    </ToggleGroup.Item>

    <ToggleGroup.Item
      className="px-4 py-2 rounded-full !text-[12px] font-medium transition-all duration-200 data-[state=on]:bg-white data-[state=on]:text-black data-[state=on]:shadow-sm text-gray-600 hover:text-black cursor-pointer"
      value="3d"
      aria-label="3d mode"
      disabled
    >
      3D (coming soon)
    </ToggleGroup.Item>
  </ToggleGroup.Root>
);

export default Toggle;
