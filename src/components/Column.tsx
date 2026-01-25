import TaskCard from "./taskCard";
import type { Column as ColumnType } from "../types/types";

const colors = ["bg-[#49C4E5]", "bg-[#8471F2]", "bg-[#67E2AE]", "bg-orange-400"];

interface ColumnProps {
  column: ColumnType;
  colIndex: number;
  onTaskClick: (colIndex: number, taskIndex: number) => void;
}

const Column = ({ column, colIndex, onTaskClick }: ColumnProps) => {
  const color = colors[colIndex % colors.length];

  return (
    <div className="flex flex-col gap-6 min-w-[280px] w-[280px]">
      <div className="flex items-center gap-2">
        <div className={`rounded-full w-[15px] h-[15px] ${color}`} />
        <h2 className="text-[#828FA3] text-xs font-bold tracking-widest uppercase">
          {column.name} ({column.tasks.length})
        </h2>
      </div>
      <div className="flex flex-col gap-5 pb-10">
        {column.tasks.map((task, taskIndex) => (
          <div key={taskIndex} onClick={() => onTaskClick(colIndex, taskIndex)}>
             <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
