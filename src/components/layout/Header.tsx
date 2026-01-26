import { Plus } from "lucide-react";
import EllipsisMenu from "../common/EllipsisMenu";
import type { Board } from "../../types/types";

interface HeaderProps {
  activeBoard: Board;
  onAddNewTask: () => void;
  onEditBoard: () => void;
  onDeleteBoard: () => void;
}

const Header = ({ activeBoard, onAddNewTask, onEditBoard, onDeleteBoard }: HeaderProps) => {
  return (
    <header className="bg-[var(--color-bg-surface)] p-6 flex flex-row items-center justify-between w-full border-b border-[var(--color-border)] transition-colors duration-200">
      <div className="flex items-center gap-4">
        {/* Mobile Logo could go here if needed */}
        <h1 className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] max-w-[200px] md:max-w-none truncate transition-colors duration-200">
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
        <EllipsisMenu 
            type="Board" 
            setOpenEditModal={onEditBoard} 
            setOpenDeleteModal={onDeleteBoard} 
        />
      </div>
    </header>
  );
};

export default Header;
