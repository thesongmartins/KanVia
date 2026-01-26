import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "./Modal";
import type { Board } from "../../types/types";

interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "edit";
  board?: Board;
  onSubmit: (data: { name: string; columns: { name: string; tasks: [] }[] }) => void;
}

const BoardModal = ({ isOpen, onClose, type, board, onSubmit }: BoardModalProps) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState<{ name: string; tasks: [] }[]>([
    { name: "Todo", tasks: [] },
    { name: "Doing", tasks: [] },
  ]);

  useEffect(() => {
    if (isOpen) {
      if (type === "edit" && board) {
        setName(board.name);
        setColumns(board.columns.map(col => ({ name: col.name, tasks: [] }))); // tasks not editing here deeply yet
      } else {
        setName("");
        setColumns([
          { name: "Todo", tasks: [] },
          { name: "Doing", tasks: [] },
        ]);
      }
    }
  }, [isOpen, type, board]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanColumns = columns.filter((col) => col.name.trim() !== "");
    onSubmit({ name, columns: cleanColumns });
    onClose();
  };

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index].name = value;
    setColumns(newColumns);
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", tasks: [] }]);
  };

  const removeColumn = (index: number) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "add" ? "Add New Board" : "Edit Board"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Board Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Web Design"
            className="border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] placeholder-[#828FA3]/50 transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-(--color-text-secondary) text-xs font-bold">Board Columns</label>
          {columns.map((col, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={col.name}
                onChange={(e) => updateColumn(index, e.target.value)}
                placeholder="e.g. Todo"
                className="flex-1 border border-(--color-input-border) rounded px-4 py-2 text-sm text-(--color-text-primary) bg-transparent outline-none focus:border-[#635FC7] placeholder-[#828FA3]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => removeColumn(index)}
                className="text-(--color-text-secondary) hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColumn}
            className="bg-(--color-bg-main) text-[#635FC7] font-bold py-2 rounded-full hover:bg-[#D8D7F1] transition-colors mt-2"
          >
            + Add New Column
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#635FC7] text-white font-bold py-2 rounded-full hover:bg-[#A8A4FF] transition-colors"
        >
          {type === "add" ? "Create New Board" : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardModal;
