import { PenSquareIcon, Trash2Icon, AlertTriangle, Loader } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      if (error.response?.status !== 401) {
        toast.error("Failed to delete note");
      }
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Styled Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="bg-error/10 p-4 rounded-full">
                <AlertTriangle className="w-10 h-10 text-error" />
              </div>
              <h3 className="font-bold text-lg">Delete Note?</h3>
              <p className="text-base-content/70 text-sm">
                This action cannot be undone. The note will be permanently
                removed.
              </p>
            </div>
            <div className="modal-action justify-center gap-3 mt-6">
              <button
                className="btn btn-ghost btn-sm px-6"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-error btn-sm px-6"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 mr-1" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/40"
            onClick={() => !deleting && setShowDeleteModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default NoteCard;
