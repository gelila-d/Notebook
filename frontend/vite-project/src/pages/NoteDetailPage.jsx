import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader, Trash2 } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Ref to track if toast has already been shown
  const toastShownRef = useRef(false);

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        if (!toastShownRef.current) {
          toast.error("Failed to fetch the note");
          toastShownRef.current = true;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Failed to delete note");
    }
  };

  // Save note
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);

      // Show toast only once
      if (!toastShownRef.current) {
        toast.success("Note updated successfully");
        toastShownRef.current = true;
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <Link to="/" className="btn btn-ghost flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>

        {/* Note Form */}
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note title"
                className="input input-bordered"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="Write your note..."
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
