import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited,setIsRateLimited]= useState(false);
  const [notes,setNotes]= useState([]);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      console.log("Notes:", response.data);
      setNotes(response.data);
      setLoading(false);
      setIsRateLimited(false);
    } catch (error) {
      console.log("Axios error:", error);
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);}
        else {
          toast.error("Failed to fetch notes. Please try again later.");}
        
    }
      finally {
      setLoading(false);}
  };

  fetchNotes(); 
}, []);

  return (
    <div className='min-h-screen '>
     <Navbar/>
     {isRateLimited &&  <RateLimitedUI/>}

     <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && <div className='text-center text-accent py-10'>Loading...</div>}
      {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
      {notes.length > 0 && !isRateLimited && (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    {notes.map(note => (
      <NoteCard key={note._id} note={note} setNotes={setNotes}/>
    ))}
  </div>
)}

     </div>


    </div>
  )
}

export default HomePage
