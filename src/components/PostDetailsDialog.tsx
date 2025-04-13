import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PostDetailsDialogProps {
  post: {
    id: string;
    title: string;
    author: string;
    phone: string;
    status: string;
    createdAt: string;
    price: string;
    address: string;
    description: string;
    images: string[];
    returnReason?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge className="bg-yellow-500">Chờ duyệt</Badge>;
    case "approved":
      return <Badge className="bg-green-500">Đã duyệt</Badge>;
    case "rejected":
      return <Badge className="bg-red-500">Từ chối</Badge>;
    case "returned":
      return <Badge className="bg-blue-500">Yêu cầu sửa</Badge>;
    default:
      return <Badge>Không xác định</Badge>;
  }
};

const PostDetailsDialog = ({
  post,
  isOpen,
  onClose,
}: PostDetailsDialogProps) => {
  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span>Trạng thái: {getStatusBadge(post.status)}</span>
            <span>• Ngày đăng: {post.createdAt}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            {post.images && post.images.length > 0 && (
              <div className="rounded-md overflow-hidden">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Thông tin chung</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-gray-500">Giá phòng:</div>
                <div className="text-sm font-medium">{post.price} VND</div>
                <div className="text-sm text-gray-500">Địa chỉ:</div>
                <div className="text-sm font-medium">{post.address}</div>
                <div className="text-sm text-gray-500">Người đăng:</div>
                <div className="text-sm font-medium">{post.author}</div>
                <div className="text-sm text-gray-500">Liên hệ:</div>
                <div className="text-sm font-medium">{post.phone}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Mô tả</h3>
              <p className="text-sm mt-2">{post.description}</p>
            </div>

            {post.returnReason && (
              <div className="p-3 bg-blue-50 rounded-md">
                <h3 className="font-semibold text-sm text-blue-700">
                  Lý do yêu cầu sửa:
                </h3>
                <p className="text-sm mt-1 text-blue-600">
                  {post.returnReason}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsDialog;
