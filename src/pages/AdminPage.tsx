import { useState } from "react";
import PostTable from "../components/PostTable";
import CollapsibleNavList from "../components/CollapsibleNavList";
import { LayoutDashboard } from "lucide-react";

const AdminPage = () => {
  // Mock authentication state - replace with actual auth logic later
  const isAdmin = true;
  const [activeSection, setActiveSection] = useState("posts");

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="mb-4">
            You do not have permission to access this page.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-muted/20">
      <CollapsibleNavList className="h-screen sticky top-0" />

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center gap-2 mb-6">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Post Management</h2>
          <PostTable />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
