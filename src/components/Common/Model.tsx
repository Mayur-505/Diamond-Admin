import { FC, ReactNode } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  modalWidth?: string;
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, onClose, open, className }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`p-5 md:p-10 ${className}`}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
