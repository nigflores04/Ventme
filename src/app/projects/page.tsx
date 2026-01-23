"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button";
import { ProjectInterface, ProjectFilters } from "@/interface/project";
import { FiPlus, FiFolder} from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/project";
import AvatarMenu from "@/components/AvatarMenu";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');

    const {
      data: projectsData,
      isLoading,
      error
    } = useQuery({
      queryKey: ["projects"],
      queryFn: () => getProjects(),
    });

    // console.log(projectsData);

  const projects = projectsData?.projects || [];
  
  const filteredProjects = projects.filter((project: ProjectInterface) => {
    // Filter by search query using project name instead of title
    if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });




  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-transparent border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
            <div className="flex items-center gap-3">
              <Link href="/design">
                <Button className="!text-sm">
                  <FiPlus className="w-4 h-4" />
                  New Project
                </Button>
              </Link>
              <AvatarMenu />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {/* Recent Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <h2 className="text-sm font-medium text-gray-600">Recent</h2>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Failed to load projects</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="!text-sm"
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project: ProjectInterface) => (
                  <Link
                    href={`/projects/${project.id}`}
                    key={project.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-orange-100 relative">
                      {project.referenceImage ? (
                        <img
                          src={project.referenceImage}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center shadow-sm">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-orange-400 rounded"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Status indicator */}
                      {!project.isActive && (
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      )}

                      {/* Generation count badge */}
                      {project.generationCount > 0 && (
                        <div className="absolute bottom-2 left-2">
                          <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {project.generationCount} designs
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-1">
                        {project.room_type && `${project.room_type} • `}
                        {project.style_preset}
                      </p>
                      <p className="text-xs text-gray-500">
                        Created{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Empty State for no projects */}
          {!isLoading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiFolder className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No project yet
              </h3>
              <p className="text-gray-500 mb-6">
                Get started by creating your first project
              </p>
              <Button className="">
                <FiPlus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;