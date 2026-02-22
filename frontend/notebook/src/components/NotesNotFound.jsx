import React from "react";
import { NotebookIcon, PlusCircleIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-4" data-theme="cupcake">
      
      {/* Icon Circle */}
      <div className="bg-primary/20 p-6 rounded-full shadow-md">
        <NotebookIcon className="size-16 text-primary" />
      </div>

      {/* Text */}
      <h2 className="text-2xl font-bold text-base-content">
        No Notes Found
      </h2>
      <p className="text-base-content/70 max-w-md">
        You don’t have any notes yet. Start writing your thoughts and ideas now ✨
      </p>

      {/* Create Button */}
      <Link to="/create" className="btn btn-accent gap-2 mt-2">
        <PlusCircleIcon className="size-5" />
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
