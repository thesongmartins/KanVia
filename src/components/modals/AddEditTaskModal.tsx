import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import type { Column } from "../../types/types";

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If editing, pass task data here (omitted for now for simplicity of "Add" only)
  columns: Column[];
  onSubmit: (taskData: any) => void;
}

const AddEditTaskModal = ({
  isOpen,
  onClose,
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
    if (columns.length > 0 && !status) {
      setStatus(columns[0].name);
    }
  }, [columns, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      subtasks: subtasks.filter((st) => st.title.trim() !== ""),
    };
    onSubmit(newTask);
    onClose();
    // Reset form
    setTitle("");
    setDescription("");
    setSubtasks([
      { title: "", isCompleted: false },
      { title: "", isCompleted: false },
    ]);
    setStatus(columns[0]?.name || "");
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
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[#828FA3] text-xs font-bold dark:text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Take coffee break"
            className="border border-[#828FA3]/25 rounded px-4 py-2 text-sm text-[#000112] dark:text-white bg-transparent outline-none focus:border-[#635FC7]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#828FA3] text-xs font-bold dark:text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="border border-[#828FA3]/25 rounded px-4 py-2 text-sm text-[#000112] dark:text-white bg-transparent outline-none focus:border-[#635FC7] min-h-[100px]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#828FA3] text-xs font-bold dark:text-white">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={subtask.title}
                onChange={(e) => updateSubtask(index, e.target.value)}
                placeholder={index % 2 === 0 ? "e.g. Make coffee" : "e.g. Drink coffee & smile"}
                className="flex-1 border border-[#828FA3]/25 rounded px-4 py-2 text-sm text-[#000112] dark:text-white bg-transparent outline-none focus:border-[#635FC7]"
              />
              <button
                type="button"
                onClick={() => removeSubtask(index)}
                className="text-[#828FA3] hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubtask}
            className="bg-[#F4F7FD] dark:bg-white text-[#635FC7] font-bold py-2 rounded-full hover:bg-[#D8D7F1] transition-colors mt-2"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#828FA3] text-xs font-bold dark:text-white">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[#828FA3]/25 rounded px-4 py-2 text-sm text-[#000112] dark:text-white bg-transparent outline-none focus:border-[#635FC7] cursor-pointer"
            >
              {columns.map((col) => (
                <option key={col.name} value={col.name} className="dark:bg-[#2B2C37]">
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
          Create Task
        </button>
      </form>
    </Modal>
  );
};

export default AddEditTaskModal;
