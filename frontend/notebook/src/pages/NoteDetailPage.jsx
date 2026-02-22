import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader, Trash2, AlertTriangle } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Separate refs so fetch error and save success don't interfere
  const fetchToastShownRef = useRef(false);

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note", error);
        // 401 is handled globally by axios interceptor
        if (error.response?.status !== 401 && !fetchToastShownRef.current) {
          toast.error("Failed to fetch the note");
          fetchToastShownRef.current = true;
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Delete note (called after modal confirmation)
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note", error);
      // 401 handled globally; show error for other failures
      if (error.response?.status !== 401) {
        toast.error("Failed to delete note");
      }
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Save note
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note", error);
      // 401 handled globally; show error for other failures
      if (error.response?.status !== 401) {
        toast.error("Failed to update note");
      }
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
            onClick={() => setShowDeleteModal(true)}
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
                {saving ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 mr-1" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default NoteDetailPage;
