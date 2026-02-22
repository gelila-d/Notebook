import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import toast from 'react-hot-toast';

// Components
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import api from '../lib/axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const verifyAndFetch = async () => {
      // 1. Check if cookie exists locally
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        // 2. Verify token with Backend
        const { data } = await axios.post(
          "http://localhost:5002/", // Auth server root (user verification)
          {},
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie("token");
          navigate("/login");
          return;
        }

        setUsername(data.user);
        
        const notesResponse = await api.get("/notes");
        setNotes(notesResponse.data);
        setIsRateLimited(false);

      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Session expired or server error.");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetch();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-base-100' data-theme="cupcake">
      <Navbar username={username} onLogout={handleLogout} />
      
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {/* Welcome Header */}
        {!isRateLimited && username && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Welcome, <span className="text-primary">{username}</span>
            </h1>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center py-10'>
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* Notes Logic */}
        {!loading && !isRateLimited && (
          <>
            {notes.length === 0 ? (
              <NotesNotFound />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {notes.map(note => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;