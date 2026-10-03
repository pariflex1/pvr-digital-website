import React from "react";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata = {
  title: "Live Client Projects | PVR Tech",
  description: "Explore our curated showcase of high-speed websites, custom platforms, and automated lead funnels engineered for growing Indian businesses.",
  alternates: { canonical: "/projects" }
};

export default function ProjectsPage() {
  return (
    <div className="bg-primary min-h-screen pt-20">
      <ProjectsSection />
    </div>
  );
}
