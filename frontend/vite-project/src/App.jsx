import { Navigate } from "react-router";
import { useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

export default function App() {
  const [cookies] = useCookies(["token"]);

  return (
    <div data-theme="cupcake">
      <Toaster position="top-right" />
      <Routes>
        {/* If token exists, show HomePage. If not, redirect to Login */}
        <Route 
          path="/" 
          element={cookies.token ? <HomePage /> : <Navigate to="/login" />} 
        />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}