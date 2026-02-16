'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, ExternalLink, Clock, Star, Filter, X, CalendarIcon, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

interface Facets {
  categories: Record<string, number>;
  tags: Record<string, number>;
  difficulties: Record<string, number>;
}

interface SearchResult {
  resources: Resource[];
  pagination: Pagination;
  facets: Facets;
}

export default function AdvancedSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search state
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(searchParams.get('tags')?.split(',').filter(Boolean) || []);
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');
  const [author, setAuthor] = useState(searchParams.get('author') || '');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(searchParams.get('dateFrom') ? new Date(searchParams.get('dateFrom')!) : undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(searchParams.get('dateTo') ? new Date(searchParams.get('dateTo')!) : undefined);

  // Sorting
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'date');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');

  // Results
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Update URL params
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (category) params.set('category', category);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    if (difficulty) params.set('difficulty', difficulty);
    if (author) params.set('author', author);
    if (dateFrom) params.set('dateFrom', format(dateFrom, 'yyyy-MM-dd'));
    if (dateTo) params.set('dateTo', format(dateTo, 'yyyy-MM-dd'));
    if (sortBy !== 'date') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (page > 1) params.set('page', page.toString());

    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [query, category, selectedTags, difficulty, author, dateFrom, dateTo, sortBy, sortOrder, page, router]);

  // Perform search
  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: query,
        category,
        tags: selectedTags.join(','),
        difficulty,
        author,
        sortBy,
        sortOrder,
        page: page.toString(),
        limit: '12',
      });
      if (dateFrom) params.set('dateFrom', format(dateFrom, 'yyyy-MM-dd'));
      if (dateTo) params.set('dateTo', format(dateTo, 'yyyy-MM-dd'));

      const response = await fetch(`/api/resources?${params}`);
      const data: SearchResult = await response.json();
      setResults(data);

      // Track search analytics
      if (query) {
        fetch('/api/search-analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, resultsCount: data.resources.length }),
        }).catch(console.error);
      }

      // Update recent searches
      if (query && !recentSearches.includes(query)) {
        const updated = [query, ...recentSearches.slice(0, 9)];
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [query, category, selectedTags, difficulty, author, dateFrom, dateTo, sortBy, sortOrder, page, recentSearches]);

  // Trigger search on filter changes
  useEffect(() => {
    if (query || category || selectedTags.length > 0 || difficulty || author || dateFrom || dateTo) {
      performSearch();
    } else {
      setResults(null);
    }
    updateURL();
  }, [performSearch, updateURL]);

  // Handle input change for suggestions
  const handleInputChange = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = recentSearches.filter(s => s.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Highlight search terms in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setCategory('');
    setSelectedTags([]);
    setDifficulty('');
    setAuthor('');
    setDateFrom(undefined);
    setDateTo(undefined);
    setSortBy('date');
    setSortOrder('desc');
    setPage(1);
  };

  // Categories and difficulties options
  const categories = ['Tutorial', 'Article', 'Video', 'Course', 'Documentation', 'Tool', 'Book'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  // Get top tags from facets
  const topTags = useMemo(() => {
    if (!results?.facets.tags) return [];
    return Object.entries(results.facets.tags)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([tag]) => tag);
  }, [results?.facets.tags]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Advanced Search</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Find the perfect learning resources with powerful filters and search capabilities.
        </p>

        {/* Search Input with Autocomplete */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(recentSearches.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-10"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg mt-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <History className="h-4 w-4 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={category} onValueChange={setCategory}>
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

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Difficulties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Difficulties</SelectItem>
              {difficulties.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={clearFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag} ({results?.facets.tags[tag] || 0})
                </Badge>
              ))}
            </div>
          </div>

          {/* Author */}
          <div>
            <h3 className="font-semibold mb-2">Author</h3>
            <Input
              placeholder="Filter by author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div>
            <h3 className="font-semibold mb-2">Date Range</h3>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" aria-label="Select from date">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" aria-label="Select to date">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
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
      ) : results ? (
        <>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              Found {results.pagination.total} results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {results.resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">
                      {highlightText(resource.title, query)}
                    </CardTitle>
                    <Badge variant="secondary">{resource.category}</Badge>
                  </div>
                  {resource.description && (
                    <CardDescription className="line-clamp-3">
                      {highlightText(resource.description, query)}
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

          {/* Pagination */}
          {results.pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {results.pagination.pages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(results.pagination.pages, page + 1))}
                disabled={page === results.pagination.pages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Start your search
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a search term or apply filters to find resources
          </p>
        </div>
      )}
    </div>
  );
}
