import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import PostDetailsDialog from "./PostDetailsDialog";
import RejectPostDialog from "./RejectPostDialog";
import ReturnPostDialog from "./ReturnPostDialog";

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    title: "Phòng đẹp tại S1.05",
    author: "Nguyễn Văn A",
    phone: "0901234567",
    status: "pending",
    createdAt: "2023-05-15",
    price: "3,500,000",
    address: "S1.05, Vinhomes Grand Park",
    description: "Phòng rộng 20m2, có ban công, đầy đủ nội thất",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    ],
  },
  {
    id: "2",
    title: "Cần người ở ghép S2.12",
    author: "Trần Thị B",
    phone: "0912345678",
    status: "approved",
    createdAt: "2023-05-14",
    price: "2,800,000",
    address: "S2.12, Vinhomes Grand Park",
    description: "Cần 1 nữ ở ghép, phòng 2 người, có máy lạnh",
    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&q=80",
    ],
  },
  {
    id: "3",
    title: "Phòng studio tại S3.01",
    author: "Lê Văn C",
    phone: "0923456789",
    status: "rejected",
    createdAt: "2023-05-13",
    price: "4,200,000",
    address: "S3.01, Vinhomes Grand Park",
    description: "Phòng studio 30m2, full nội thất cao cấp",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
    ],
  },
  {
    id: "4",
    title: "Phòng đôi tại S5.03",
    author: "Phạm Thị D",
    phone: "0934567890",
    status: "returned",
    createdAt: "2023-05-12",
    price: "3,800,000",
    address: "S5.03, Vinhomes Grand Park",
    description: "Phòng đôi rộng rãi, view đẹp, an ninh 24/7",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80",
    ],
    returnReason: "Thiếu thông tin về tiện ích chung của tòa nhà",
  },
];

const PostTable = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [postToAction, setPostToAction] = useState(null);

  const getStatusBadge = (status) => {
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

  const handleViewDetails = (post) => {
    setSelectedPost(post);
    setShowDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
  };

  const handleReject = (post) => {
    setPostToAction(post);
    setShowRejectDialog(true);
  };

  const handleReturn = (post) => {
    setPostToAction(post);
    setShowReturnDialog(true);
  };

  const handleApprove = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, status: "approved" } : post,
      ),
    );
  };

  const handleConfirmReject = (reason) => {
    if (postToAction) {
      setPosts(
        posts.map((post) =>
          post.id === postToAction.id
            ? { ...post, status: "rejected", returnReason: reason }
            : post,
        ),
      );
      setShowRejectDialog(false);
      setPostToAction(null);
    }
  };

  const handleConfirmReturn = (reason) => {
    if (postToAction) {
      setPosts(
        posts.map((post) =>
          post.id === postToAction.id
            ? { ...post, status: "returned", returnReason: reason }
            : post,
        ),
      );
      setShowReturnDialog(false);
      setPostToAction(null);
    }
  };

  const handleCloseRejectDialog = () => {
    setShowRejectDialog(false);
    setPostToAction(null);
  };

  const handleCloseReturnDialog = () => {
    setShowReturnDialog(false);
    setPostToAction(null);
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>Danh sách bài đăng</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Người đăng</TableHead>
            <TableHead>Ngày đăng</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.createdAt}</TableCell>
              <TableCell>{post.price} VND</TableCell>
              <TableCell>{getStatusBadge(post.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(post)}
                  >
                    Chi tiết
                  </Button>
                  {post.status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(post.id)}
                      >
                        Duyệt
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(post)}
                      >
                        Từ chối
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleReturn(post)}
                      >
                        Yêu cầu sửa
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PostDetailsDialog
        post={selectedPost}
        isOpen={showDetailsDialog}
        onClose={handleCloseDetailsDialog}
      />

      {postToAction && (
        <>
          <RejectPostDialog
            isOpen={showRejectDialog}
            onClose={handleCloseRejectDialog}
            onConfirm={handleConfirmReject}
            postTitle={postToAction.title}
          />

          <ReturnPostDialog
            isOpen={showReturnDialog}
            onClose={handleCloseReturnDialog}
            onConfirm={handleConfirmReturn}
            postTitle={postToAction.title}
          />
        </>
      )}
    </div>
  );
};

export default PostTable;
