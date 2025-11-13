"use client";

import { useState } from "react";
import { Sidebar } from "@/components/organisms";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header />
      <div className="flex">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 p-4">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
          {children}
        </main>

        {/* Sidebar for mobile */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:hidden`}
        >
          <div className="p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </Button>
            <Sidebar />
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="fixed top-4 left-4 md:hidden z-50">
          <Button variant="ghost" size="sm" onClick={toggleSidebar}>
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
