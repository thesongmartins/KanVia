import { X } from "lucide-react";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-[#2B2C37] rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                {title && <h3 className="text-lg font-bold text-[#000112] dark:text-white">{title}</h3>}
                 {/* Optional: Add X button here if desired, but click outside is standard */}
            </div>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
