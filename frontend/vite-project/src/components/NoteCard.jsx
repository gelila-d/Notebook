import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation(); // 🚨 VERY IMPORTANT

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);

      // Update UI instantly
      setNotes(prevNotes => prevNotes.filter(n => n._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link 
      to={`/notes/${note._id}`} 
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-accent"
    >
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        <p className="line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm opacity-70">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />

            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
