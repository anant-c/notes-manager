import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { getNotes, createNote, updateNote, deleteNote } from "@/utils/api";





const Notes = () => {
  const [userInfo, setUserInfo] = useState()
  const navigate = useNavigate()
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = ()=>{
    localStorage.removeItem("Token")
    localStorage.removeItem("User Info:")
    navigate("/signin")
  }

  // Load user info
  useEffect(() => {
    const data = localStorage.getItem('User Info:');
    setUserInfo(JSON.parse(data));
  }, []);
  
  // Fetch all notes on load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      toast({ title: "Error loading notes", description: err?.response?.data?.message || 'Could not fetch notes', variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({ title: "Error", description: "Please fill in both title and content", variant: "destructive" });
      return;
    }
    try {
      const noteData = {
        userId: userInfo?._id, // make sure your backend expects this
        title: formData.title,
        content: formData.content,
      };
      const res = await createNote(noteData);
      setNotes([res.data, ...notes]);
      setFormData({ title: "", content: "" });
      setIsCreateOpen(false);
      toast({ title: "Success", description: "Note created successfully" });
    } catch (err) {
      toast({ title: "Error", description: err?.response?.data?.message || 'Could not create note', variant: "destructive" });
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({ title: "Error", description: "Please fill in both title and content", variant: "destructive" });
      return;
    }
    try {
      const res = await updateNote(editingNote._id, {
        title: formData.title,
        content: formData.content,
      });
      setNotes(notes.map(n => n._id === editingNote._id ? res.data : n));
      setFormData({ title: "", content: "" });
      setEditingNote(null);
      setIsEditOpen(false);
      toast({ title: "Success", description: "Note updated successfully" });
    } catch (err) {
      toast({ title: "Error", description: err?.response?.data?.message || 'Could not update note', variant: "destructive" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
      toast({ title: "Success", description: "Note deleted successfully" });
    } catch (err) {
      toast({ title: "Error", description: err?.response?.data?.message || 'Could not delete note', variant: "destructive" });
    }
  };

  useEffect(()=>{
    const data = localStorage.getItem('User Info:')
    const userData = JSON.parse(data)
    setUserInfo(userData)
  },[])
   
  return (
    <div className='min-h-screen bg-background'>
      <div className="border-b bg-[#F9F6FE]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button className="bg-[#F9F6FE] text-black hover:cursor-pointer hover:text-[#8447EE] hover:bg-[#F1ECF9]" size="sm" >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#8447EE]  hover:scale-110 cursor-pointer transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Note title..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Write your note content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="min-h-[120px]"
                  />
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleCreate} className="bg-[#8447EE]  hover:scale-125 transition-all">
                      Create Note
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
          </div>
        </div>
      </div>

      <div className='justify-center mt-10 text-2xl text-wrap flex'>
        Hi 👋, <span className='font-bold italic text-[#8447EE]'>{userInfo?.name.split(" ")[0]}</span> 
        <Button className="ml-4 hover:cursor-pointer transition-all" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-6">Create your first note to get started</p>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#8447EE]  hover:scale-110 cursor-pointer transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Note
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Card key={note.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-primary/10">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {note.title}
                    </CardTitle>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(note)}
                        className="h-8 w-8 p-0 hover:bg-primary/10"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(note.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm line-clamp-4 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="mt-4 pt-3 border-t border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      Updated {note.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Note title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Write your note content here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="min-h-[120px]"
            />
            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdate} className="bg-[#8447EE]  hover:scale-110 cursor-pointer transition-all">
                Update Note
              </Button>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />

    </div>
  )
}

export default Notes