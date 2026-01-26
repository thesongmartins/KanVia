import { EllipsisVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface EllipsisMenuProps {
  type: "Board" | "Task";
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

const EllipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }: EllipsisMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEdit = () => {
    setOpenEditModal();
    setIsOpen(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[var(--color-text-secondary)] hover:text-[#20212C] dark:hover:text-white transition-colors p-2"
      >
        <EllipsisVertical className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-48 rounded-lg shadow-xl bg-[var(--color-bg-surface)] py-4 z-50 flex flex-col gap-4 border border-[var(--color-border)]">
          <button
            onClick={handleEdit}
            className="text-[var(--color-text-secondary)] text-[13px] font-medium hover:text-[var(--color-text-primary)] w-full text-left px-6"
          >
            Edit {type}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 text-[13px] font-medium hover:text-red-300 w-full text-left px-6"
          >
            Delete {type}
          </button>
        </div>
      )}
    </div>
  );
};

export default EllipsisMenu;
