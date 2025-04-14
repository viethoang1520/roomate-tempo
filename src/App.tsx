import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/Header";
import routes from "tempo-routes";

// Lazy load pages for better performance
const RoomDetailPage = lazy(() => import("./pages/RoomDetailPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// Placeholder for future pages
const SearchPage = () => <div className="p-8">Search Page - Coming Soon</div>;
// Import the actual PostRoomPage component
import PostRoomPageComponent from "./pages/PostRoomPage";
// Import the actual ProfilePage component
import ProfilePageComponent from "./pages/ProfilePage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./components/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import FindRoomPage from "./pages/FindRoomPage";

function App() {
  // Mock authentication state - replace with actual auth logic later
  const isAuthenticated = false;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/post-room"
            element={
              isAuthenticated ? (
                <PostRoomPageComponent />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePageComponent />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/test-profile" element={<ProfilePageComponent />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/room/:roomId" element={<RoomDetailPage />} />
          <Route path="/post-test" element={<PostRoomPageComponent />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/find-room" element={<FindRoomPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
