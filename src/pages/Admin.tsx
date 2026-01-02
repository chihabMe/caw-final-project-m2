import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  live_url: string;
  github_url: string;
  image_url: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  const fetchData = async () => {
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (projectsError) toast.error("Error fetching projects");
    else setProjects(projectsData || []);

    const { data: contactsData, error: contactsError } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (contactsError) toast.error("Error fetching contacts");
    else setContacts(contactsData || []);

    setLoading(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("projects").insert([
      { title, description, live_url: liveUrl, github_url: githubUrl, image_url: imageUrl }
    ]);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Project added successfully!");
      setTitle("");
      setDescription("");
      setLiveUrl("");
      setGithubUrl("");
      setImageUrl("");
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) return <div className="admin-theme min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="admin-theme min-h-screen bg-gray-50 font-sans text-foreground">
      <nav className="border-b bg-card px-8 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">Portfolio Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline">Welcome back</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <Tabs defaultValue="projects" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Project</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Title</Label>
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>Live URL</Label>
                      <Input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://..." className="bg-background" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="bg-background" rows={4} />
                  </div>
                  <Button type="submit">Add Project</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[200px]">Links</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell className="max-w-md truncate text-muted-foreground">{project.description}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {project.live_url && <a href={project.live_url} target="_blank" className="text-primary hover:underline text-sm">Live</a>}
                            {project.github_url && <a href={project.github_url} target="_blank" className="text-primary hover:underline text-sm">GitHub</a>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="text-muted-foreground">{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-md truncate text-muted-foreground">{contact.message}</TableCell>
                      </TableRow>
                    ))}
                    {contacts.length === 0 && (
                      <TableRow>
                         <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No messages yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
