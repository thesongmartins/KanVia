import { Eye } from "lucide-react";
import SideBar from "./SideBar";
import Header from "./Header";
import type { Board } from "../../types/types";

interface LayoutProps {
  children: React.ReactNode;
  boards: Board[];
  activeBoardIndex: number;
  setActiveBoardIndex: (index: number) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onAddNewTask: () => void;
}

const Layout = ({
  children,
  boards,
  activeBoardIndex,
  setActiveBoardIndex,
  theme,
  setTheme,
  isSidebarOpen,
  setIsSidebarOpen,
  onAddNewTask,
}: LayoutProps) => {
  return (
    <div className="flex h-screen bg-[#F4F7FD] dark:bg-[#20212c] overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <SideBar
          boards={boards}
          activeBoardIndex={activeBoardIndex}
          setActiveBoardIndex={setActiveBoardIndex}
          theme={theme}
          setTheme={setTheme}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {/* Show Sidebar Button (when closed) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-8 left-0 z-50 bg-[#635FC7] p-4 rounded-r-full hover:bg-[#A8A4FF] transition-colors"
        >
          <Eye className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <Header activeBoard={boards[activeBoardIndex]} onAddNewTask={onAddNewTask} />

        {/* Page content (boards & cards will live here) */}
        <main className="flex-1 overflow-auto bg-[#F4F7FD] dark:bg-[#20212c]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
