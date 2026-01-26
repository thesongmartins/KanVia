
import EllipsisMenu from "../common/EllipsisMenu";
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
  onEditTask: () => void;
  onDeleteTask: () => void;
}

const TaskModal = ({
  isOpen,
  onClose,
  task,
  columns,
  currentColumnName,
  onStatusChange,
  onSubtaskToggle,
  onEditTask,
  onDeleteTask,
}: TaskModalProps) => {
  if (!task) return null;

  const completedSubtasks = task.subtasks.filter((st) => st.isCompleted).length;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-start gap-4 mb-6">
        <h2 className="text-lg font-bold text-(--color-text-primary) leading-normal">
          {task.title}
        </h2>
        <EllipsisMenu 
            type="Task" 
            setOpenEditModal={onEditTask} 
            setOpenDeleteModal={onDeleteTask} 
        />
      </div>

      <p className="text-(--color-text-secondary) text-[13px] leading-6 mb-6">
        {task.description || "No description provided."}
      </p>

      <div className="mb-6">
        <h3 className="text-(--color-text-secondary) text-xs font-bold mb-4">
          Subtasks ({completedSubtasks} of {task.subtasks.length})
        </h3>
        <div className="flex flex-col gap-2">
          {task.subtasks.map((subtask, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-(--color-bg-main) p-3 rounded hover:bg-[#635FC7]/25 transition-colors cursor-pointer"
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
                    : "text-(--color-text-primary)"
                }`}
              >
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-(--color-text-secondary) text-xs font-bold mb-2">Current Status</h3>
        <div className="relative">
          <select
            value={currentColumnName}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full border border-(--color-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] cursor-pointer transition-colors"
          >
            {columns.map((col) => (
              <option
                key={col.name}
                value={col.name}
                className="bg-(--color-bg-surface) text-(--color-text-primary)"
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
