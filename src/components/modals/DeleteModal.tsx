import Modal from "../modals/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  type: "board" | "task";
  title: string;
}

const DeleteModal = ({ isOpen, onClose, onDelete, type, title }: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete this ${type}?`}>
      <div className="flex flex-col gap-6">
        <p className="text-(--color-text-secondary) text-[13px] leading-6">
          Are you sure you want to delete the ‘{title}’ {type} and its tasks? This action cannot be reversed.
        </p>
        <div className="flex gap-4 w-full">
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white font-bold py-2 rounded-full hover:bg-red-300 transition-colors text-[13px]"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-(--color-bg-main) text-[#635FC7] font-bold py-2 rounded-full hover:bg-[#D8D7F1] transition-colors text-[13px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
