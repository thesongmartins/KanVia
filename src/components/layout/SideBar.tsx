import { Layout as LayoutIcon, Moon, Sun, EyeOff } from "lucide-react";
import type { Board } from "../../types/types";

interface SideBarProps {
  boards: Board[];
  activeBoardIndex: number;
  setActiveBoardIndex: (index: number) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onAddBoard: () => void;
}

const SideBar = ({
  boards,
  activeBoardIndex,
  setActiveBoardIndex,
  theme,
  setTheme,
  setIsSidebarOpen,
  onAddBoard,
}: SideBarProps) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="hidden md:flex flex-col w-[300px] h-screen bg-white dark:bg-[#2B2C37] border-r border-[#E4EBFA] dark:border-[#3E3F4E] transition-colors duration-200">
      <div className="p-8">
        {theme === "dark" ? (
          <img src="/logo-light.svg" alt="kanban" />
        ) : (
          <img src="/logo-dark.svg" alt="kanban" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="px-8 pb-4 text-xs font-bold tracking-widest text-[#828FA3] uppercase">
          All Boards ({boards.length})
        </h3>
        <nav>
          <ul>
            {boards.map((board, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveBoardIndex(index)}
                  className={`flex items-center gap-4 w-[90%] px-8 py-4 rounded-r-full transition-colors font-bold ${
                    index === activeBoardIndex
                      ? "bg-[#635FC7] text-white"
                      : "text-[#828FA3] hover:text-[#635FC7] hover:bg-[#F0EFFA] dark:hover:bg-white"
                  }`}
                >
                  <LayoutIcon className="w-5 h-5" />
                  <span>{board.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={onAddBoard}
                className="flex items-center gap-4 px-8 py-4 text-[#635FC7] font-bold hover:text-[#A8A4FF] w-full text-left"
              >
                <LayoutIcon className="w-5 h-5" />
                <span>+ Create New Board</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center gap-6 bg-[#F4F7FD] dark:bg-[#20212C] p-3 rounded-md mb-4 transition-colors duration-200">
          <Sun
            className={`w-5 h-5 ${
              theme === "light" ? "text-yellow-500" : "text-[#828FA3]"
            }`}
          />
          <div
            className="relative inline-block w-10 h-5 align-middle select-none transition duration-200 ease-in cursor-pointer"
            onClick={toggleTheme}
          >
            <div className="w-10 h-5 bg-[#635FC7] rounded-full p-1 flex items-center">
              <div
                className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <Moon
            className={`w-5 h-5 ${
              theme === "dark" ? "text-white" : "text-[#828FA3]"
            }`}
          />
        </div>

        <button
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-2 text-[#828FA3] font-bold hover:text-[#635FC7] transition-colors"
        >
          <EyeOff className="w-5 h-5" />
          <span>Hide Sidebar</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
