import type { Task } from "../types/types";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const completedSubtasks = task.subtasks.filter((st) => st.isCompleted).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div className="bg-(--color-bg-surface) px-4 py-6 rounded-lg shadow-sm cursor-pointer group hover:text-[#635FC7] transition-colors duration-200">
      <h3 className="text-(--color-text-primary) font-bold text-[15px] mb-2 group-hover:text-[#635FC7] transition-colors">
        {task.title}
      </h3>
      <p className="text-(--color-text-secondary) text-xs font-bold">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
};

export default TaskCard;