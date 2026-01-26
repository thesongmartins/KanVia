import type { Board as BoardType } from "../types/types";
import Column from "./Column";
import { Plus } from "lucide-react";

interface BoardProps {
  board: BoardType;
  onTaskClick: (colIndex: number, taskIndex: number) => void;
  onAddColumn: () => void;
}

const Board = ({ board, onTaskClick, onAddColumn }: BoardProps) => {
  return (
    <div className="flex gap-6 h-full min-w-full">
      {board.columns.map((col, i) => (
        <Column key={i} column={col} colIndex={i} onTaskClick={onTaskClick} />
      ))}
      {/* New Column Button */}
      <div 
        onClick={onAddColumn}
        className="min-w-[280px] mt-[39px] rounded-lg bg-linear-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-[#2B2C37]/25 dark:to-[#2B2C37]/10 flex items-center justify-center cursor-pointer hover:text-[#635FC7] transition-colors mb-10 group border-2 border-dashed border-[#828FA3]/20 hover:border-[#635FC7]"
      >
          <div className="flex items-center gap-2 font-bold text-(--color-text-secondary) group-hover:text-[#635FC7] text-xl">
            <Plus />
            <span>New Column</span>
          </div>
      </div>
    </div>
  );
};

export default Board;
