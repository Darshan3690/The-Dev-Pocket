"use client";

import { useState } from "react";
import { Plus, X, Search } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Project Ideas", content: "Research new technologies for the upcoming project", date: "2025-09-30" },
    { id: 2, title: "Meeting Notes", content: "Discussed roadmap for Q4 deliverables", date: "2025-09-29" },
    { id: 3, title: "Learning Goals", content: "Complete React hooks tutorial series", date: "2025-09-28" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleAddNote = () => {
    if (newNote.title.trim() === "" && newNote.content.trim() === "") return;

    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toISOString().split("T")[0],
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "" });
    setIsModalOpen(false);
  };

  // 🔍 Search filtering logic
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notes Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your notes and tasks</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Add New Note
        </button>
      </div>

      {/* 🔍 Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-slate-900 truncate">{note.title}</h3>
              <span className="text-xs text-slate-500 whitespace-nowrap">{note.date}</span>
            </div>
            <p className="text-slate-600 text-sm mt-3 line-clamp-3">{note.content}</p>
            <div className="flex justify-end mt-4">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}

        {/* Empty States */}
        {filteredNotes.length === 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300/50 p-8 text-center col-span-full">
            <div className="text-slate-400 mb-2">
              {searchTerm ? "No matching notes found" : "No notes yet"}
            </div>
            <p className="text-sm text-slate-500">
              {searchTerm
                ? "Try adjusting your search keywords"
                : "Create your first note to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center border-b border-slate-200/60 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Create New Note</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Note title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your note here..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-slate-200/60">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
