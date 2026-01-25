import { Plus, EllipsisVertical } from "lucide-react";
import type { Board } from "../../types/types";

interface HeaderProps {
  activeBoard: Board;
  onAddNewTask: () => void;
}

const Header = ({ activeBoard, onAddNewTask }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-[#2B2C37] p-6 flex flex-row items-center justify-between w-full border-b border-[#E4EBFA] dark:border-[#3E3F4E] transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Mobile Logo could go here if needed */}
        <h1 className="text-xl md:text-2xl font-bold text-[#000112] dark:text-white max-w-[200px] md:max-w-none truncate transition-colors duration-200">
          {activeBoard.name}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onAddNewTask}
          className="flex items-center gap-2 bg-[#635FC7] hover:bg-[#A8A4FF] text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-3xl transition-colors"
        >
          <Plus className="w-4 h-4 md:hidden" />
          <span className="hidden md:inline">+ Add New Task</span>
        </button>
        <button className="text-[#828FA3] hover:text-[#20212C] dark:hover:text-white">
          <EllipsisVertical className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
