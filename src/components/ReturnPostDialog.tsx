import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ReturnPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  postTitle: string;
}

const ReturnPostDialog = ({
  isOpen,
  onClose,
  onConfirm,
  postTitle,
}: ReturnPostDialogProps) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason("");
      onClose();
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-blue-600">
            Yêu cầu sửa bài đăng
          </DialogTitle>
          <DialogDescription>
            Bạn đang yêu cầu sửa bài đăng:{" "}
            <span className="font-medium">{postTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <label
            htmlFor="return-reason"
            className="block text-sm font-medium mb-2"
          >
            Lý do yêu cầu sửa <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="return-reason"
            placeholder="Nhập lý do yêu cầu sửa bài đăng..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
          {reason.trim() === "" && (
            <p className="text-sm text-red-500 mt-1">
              Vui lòng nhập lý do yêu cầu sửa
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            disabled={reason.trim() === ""}
          >
            Xác nhận yêu cầu sửa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnPostDialog;
