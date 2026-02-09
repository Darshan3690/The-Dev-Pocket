'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, Star, ArrowLeft, User, Calendar } from 'lucide-react';
import Link from 'next/link';

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
  updatedAt: string;
}

export default function ResourceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(`/api/resources/${id}`);
        if (response.ok) {
          const data = await response.json();
          setResource(data);
        } else {
          setError('Resource not found');
        }
      } catch (err) {
        setError('Failed to fetch resource');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResource();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <Card>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/resources">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/resources">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <Badge variant="secondary">{resource.category}</Badge>
              {resource.difficulty && (
                <span className="capitalize">{resource.difficulty}</span>
              )}
              {resource.readingTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.readingTime} min read
                </div>
              )}
              {resource.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {resource.rating}/5
                </div>
              )}
            </div>
          </div>
          <Button asChild size="lg" className="mt-4 md:mt-0">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit Resource
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
              {resource.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{resource.description}</p>
                </div>
              )}

              {resource.tags && resource.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      <strong>Author:</strong> {resource.author}
                    </span>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">
                    <strong>Added:</strong> {new Date(resource.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resource Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="capitalize">{resource.category}</p>
                </div>
                {resource.difficulty && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Difficulty</span>
                    <p className="capitalize">{resource.difficulty}</p>
                  </div>
                )}
                {resource.readingTime && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Reading Time</span>
                    <p>{resource.readingTime} minutes</p>
                  </div>
                )}
                {resource.rating && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {resource.rating}/5
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-500">Last Updated</span>
                  <p>{new Date(resource.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
