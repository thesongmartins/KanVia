
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import type { Column, Task } from "../../types/types";

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If editing, pass task data here
  task?: Task | null;
  columns: Column[];
  onSubmit: (taskData: any) => void;
}

const AddEditTaskModal = ({
  isOpen,
  onClose,
  task,
  columns,
  onSubmit,
}: AddEditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<{ title: string; isCompleted: boolean }[]>([
    { title: "", isCompleted: false },
    { title: "", isCompleted: false },
  ]);
  const [status, setStatus] = useState(columns[0]?.name || "");

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setSubtasks(
          task.subtasks.length > 0
            ? task.subtasks
            : [{ title: "", isCompleted: false }, { title: "", isCompleted: false }]
        );
        setStatus(task.status);
      } else {
        // Reset for Add Mode
        setTitle("");
        setDescription("");
        setSubtasks([
          { title: "", isCompleted: false },
          { title: "", isCompleted: false },
        ]);
        if (columns.length > 0 && !status) {
            setStatus(columns[0].name);
        } else if (columns.length > 0) {
            setStatus(columns[0].name);
        }
      }
    }
  }, [isOpen, task, columns]); // Intentionally omitting status dependency for reset logic to work cleaner

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      subtasks: subtasks.filter((st) => st.title.trim() !== ""),
    };
    onSubmit(newTask); // The parent handles add vs update logic based on context
    onClose();
  };

  const updateSubtask = (index: number, value: string) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].title = value;
    setSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: "", isCompleted: false }]);
  };

  const removeSubtask = (index: number) => {
    const newSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(newSubtasks);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? "Edit Task" : "Add New Task"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Take coffee break"
            className="border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] placeholder-[#828FA3]/50 transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] min-h-[100px] placeholder-[#828FA3]/50 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={subtask.title}
                onChange={(e) => updateSubtask(index, e.target.value)}
                placeholder={index % 2 === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"}
                className="flex-1 border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] placeholder-[#828FA3]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => removeSubtask(index)}
                className="text-(--color-text-secondary) hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="bg-(--color-bg-main) text-[#635FC7] font-bold py-2 rounded-full hover:bg-[#D8D7F1] transition-colors mt-2"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] cursor-pointer"
            >
              {columns.map((col) => (
                <option key={col.name} value={col.name} className="bg-(--color-bg-surface) text-(--color-text-primary)">
                  {col.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#635FC7] text-white font-bold py-2 rounded-full hover:bg-[#A8A4FF] transition-colors"
        >
          {task ? "Save Changes" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default AddEditTaskModal;
