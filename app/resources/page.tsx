'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, ExternalLink, Clock, Star, Filter, X, CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('');
  const [author, setAuthor] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sortBy,
        sortOrder,
      });
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
      if (difficulty) params.append('difficulty', difficulty);
      if (author) params.append('author', author);
      if (dateFrom) params.append('dateFrom', format(dateFrom, 'yyyy-MM-dd'));
      if (dateTo) params.append('dateTo', format(dateTo, 'yyyy-MM-dd'));

      const response = await fetch(`/api/resources?${params}`);
      const data = await response.json();
      setResources(data.resources);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [search, category, selectedTags, difficulty, author, dateFrom, dateTo, sortBy, sortOrder, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchResources();
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Learning Resources</h1>
        <p className="text-gray-600 mb-6">
          Discover tutorials, articles, videos, and more to enhance your skills.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          <div className="flex gap-2">
            <Select value={category} onValueChange={(value) => { setCategory(value); setPage(1); }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {(selectedTags.length > 0 || difficulty || author || dateFrom || dateTo) && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {(selectedTags.length > 0 ? 1 : 0) + (difficulty ? 1 : 0) + (author ? 1 : 0) + ((dateFrom || dateTo) ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <Select value={difficulty} onValueChange={(value) => { setDifficulty(value); setPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input
                  placeholder="Filter by author"
                  value={author}
                  onChange={(e) => { setAuthor(e.target.value); setPage(1); }}
                />
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium mb-2">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={(date) => { setDateFrom(date); setPage(1); }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium mb-2">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={(date) => { setDateTo(date); setPage(1); }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setPage(1); }}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Order</label>
                <Select value={sortOrder} onValueChange={(value) => { setSortOrder(value); setPage(1); }}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Desc</SelectItem>
                    <SelectItem value="asc">Asc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSelectedTags([]);
                  setDifficulty('');
                  setAuthor('');
                  setDateFrom(undefined);
                  setDateTo(undefined);
                  setSortBy('date');
                  setSortOrder('desc');
                  setPage(1);
                }}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <Badge variant="secondary">{resource.category}</Badge>
                  </div>
                  {resource.description && (
                    <CardDescription className="line-clamp-3">
                      {resource.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-3">
                    {resource.readingTime && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {resource.readingTime} min
                      </div>
                    )}
                    {resource.rating && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    )}
                  </div>

                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {resource.author && `By ${resource.author}`}
                    </span>
                    <Button asChild size="sm">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                disabled={page === pagination.pages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
