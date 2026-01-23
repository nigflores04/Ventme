import { RootState } from '@/store';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiFolder, FiEye, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("projects");
  const user = useSelector((state: RootState) => state.user);

  const sidebarItems = [
    // { key: 'home', label: 'Home', icon: FiHome },
    { key: "projects", label: "projects", icon: FiFolder, link: "/projects" },
    { key: "view-plans", label: "View Plans", icon: FiEye, link: "/pricing" },
    // { key: "help-center", label: "Help Center", icon: FiHelpCircle },
    // { key: "templates", label: "Templates", icon: FiSettings },
    // { key: "resources", label: "Resources", icon: FiFolder },
  ];

  const handleItemNavigation = (item: any) => {
    if (item.link) {
      router.push(item.link);
    } else {
      setActiveSection(item.key);
    }
  };
  return (
    <div className="hidden md:flex w-64 bg-gray-900 text-white  flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-white.jpg"
            alt="Ventics AI"
            width={50}
            height={50}
            className=" object-cover rounded-lg mx-auto"
          />
          {/* <span className="font-semibold text-lg">Ventics AI</span> */}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  handleItemNavigation(item);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                  activeSection === item.key
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <FiUser className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium capitalize">{user?.user?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar