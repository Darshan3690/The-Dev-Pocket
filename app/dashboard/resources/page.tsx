'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { toast } from '@/lib/toast';

interface Resource {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string;
  tags: string[] | null;
  author: string | null;
  difficulty: string | null;
  readingTime: number | null;
  rating: number | null;
  createdAt: string;
}

interface ResourceFormData {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string;
  author: string;
  difficulty: string;
  readingTime: string;
  rating: string;
}

export default function ResourcesDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const form = useForm<ResourceFormData>({
    defaultValues: {
      title: '',
      description: '',
      url: '',
      category: '',
      tags: '',
      author: '',
      difficulty: '',
      readingTime: '',
      rating: '',
    },
  });

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources');
      const data = await response.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const onSubmit = async (data: ResourceFormData) => {
    try {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : null,
        readingTime: data.readingTime ? parseInt(data.readingTime) : null,
        rating: data.rating ? parseFloat(data.rating) : null,
      };

      const url = editingResource
        ? `/api/resources/${editingResource.id}`
        : '/api/resources';
      const method = editingResource ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingResource ? 'Resource updated successfully' : 'Resource created successfully');
        setIsDialogOpen(false);
        setEditingResource(null);
        form.reset();
        fetchResources();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save resource');
      }
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error('Failed to save resource');
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    form.reset({
      title: resource.title,
      description: resource.description || '',
      url: resource.url,
      category: resource.category,
      tags: resource.tags ? resource.tags.join(', ') : '',
      author: resource.author || '',
      difficulty: resource.difficulty || '',
      readingTime: resource.readingTime?.toString() || '',
      rating: resource.rating?.toString() || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Resource deleted successfully');
        fetchResources();
      } else {
        toast.error('Failed to delete resource');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  const categories = [
    'Tutorial',
    'Article',
    'Video',
    'Course',
    'Documentation',
    'Tool',
    'Book',
  ];

  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources Management</h1>
          <p className="text-gray-600">Manage learning resources for users</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingResource(null); form.reset(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </DialogTitle>
              <DialogDescription>
                {editingResource ? 'Update the resource details below.' : 'Fill in the details to add a new learning resource.'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    rules={{ required: 'URL is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} type="url" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat.toLowerCase()}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficulties.map((diff) => (
                              <SelectItem key={diff} value={diff}>
                                {diff}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="javascript, tutorial, react" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="readingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reading Time (minutes)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (0-5)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" max="5" step="0.1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingResource ? 'Update' : 'Create'} Resource
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resources</CardTitle>
          <CardDescription>
            A list of all learning resources in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading resources...</div>
          ) : resources.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No resources found. Add your first resource above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium line-clamp-1">{resource.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {resource.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{resource.category}</Badge>
                    </TableCell>
                    <TableCell>{resource.author || '-'}</TableCell>
                    <TableCell>{resource.rating ? `${resource.rating}/5` : '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(resource)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
