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

interface RejectPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  postTitle: string;
}

const RejectPostDialog = ({
  isOpen,
  onClose,
  onConfirm,
  postTitle,
}: RejectPostDialogProps) => {
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
          <DialogTitle className="text-lg text-red-600">
            Từ chối bài đăng
          </DialogTitle>
          <DialogDescription>
            Bạn đang từ chối bài đăng:{" "}
            <span className="font-medium">{postTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <label
            htmlFor="reject-reason"
            className="block text-sm font-medium mb-2"
          >
            Lý do từ chối <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="reject-reason"
            placeholder="Nhập lý do từ chối bài đăng..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
          {reason.trim() === "" && (
            <p className="text-sm text-red-500 mt-1">
              Vui lòng nhập lý do từ chối
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={reason.trim() === ""}
          >
            Xác nhận từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectPostDialog;
