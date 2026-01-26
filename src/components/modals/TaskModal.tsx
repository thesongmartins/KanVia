import { EllipsisVertical } from "lucide-react";
import type { Task, Column } from "../../types/types";
import Modal from "./Modal";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  columns: Column[]; // To show status options
  currentColumnName: string;
  onStatusChange: (newStatus: string) => void;
  onSubtaskToggle: (subtaskIndex: number) => void;
}

const TaskModal = ({
  isOpen,
  onClose,
  task,
  columns,
  currentColumnName,
  onStatusChange,
  onSubtaskToggle,
}: TaskModalProps) => {
  if (!task) return null;

  const completedSubtasks = task.subtasks.filter((st) => st.isCompleted).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-start gap-4 mb-6">
        <h2 className="text-lg font-bold text-[#000112] dark:text-white leading-normal">
          {task.title}
        </h2>
        <button className="text-[#828FA3] hover:text-[#20212C] dark:hover:text-white">
          <EllipsisVertical className="w-5 h-5" />
        </button>
      </div>

      <p className="text-[#828FA3] text-[13px] leading-6 mb-6">
        {task.description || "No description provided."}
      </p>

      <div className="mb-6">
        <h3 className="text-[#828FA3] text-xs font-bold mb-4">
          Subtasks ({completedSubtasks} of {task.subtasks.length})
        </h3>
        <div className="flex flex-col gap-2">
          {task.subtasks.map((subtask, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#F4F7FD] dark:bg-[#20212C] p-3 rounded hover:bg-[#635FC7]/25 transition-colors cursor-pointer"
              onClick={() => onSubtaskToggle(index)}
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => {}} // Handle click on parent div
                className="w-4 h-4 accent-[#635FC7] cursor-pointer"
              />
              <span
                className={`text-xs font-bold flex-1 ${
                  subtask.isCompleted
                    ? "text-[#828FA3] line-through"
                    : "text-[#000112] dark:text-white"
                }`}
              >
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#828FA3] text-xs font-bold mb-2">Current Status</h3>
        <div className="relative">
          <select
            value={currentColumnName}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-[#828FA3]/25 rounded px-4 py-2 text-sm text-[#000112] dark:text-white bg-transparent outline-none focus:border-[#635FC7] cursor-pointer"
          >
            {columns.map((col) => (
              <option
                key={col.name}
                value={col.name}
                className="bg-white dark:bg-[#2B2C37] text-[#000112] dark:text-white"
              >
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
