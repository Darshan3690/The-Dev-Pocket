'use client';

import { useState } from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SnippetCardProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  tags?: string[];
  copyCount: number;
  authorName?: string;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

export function SnippetCard({
  id,
  title,
  description,
  code,
  language,
  tags,
  copyCount,
  authorName,
  onDelete,
  isOwner,
}: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      // Track copy in backend
      try {
        await fetch(`/api/snippets/${id}/copy`, { method: 'POST' });
      } catch (error) {
        console.error('Failed to track copy:', error);
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/snippets/${id}`, { method: 'DELETE' });
      if (response.ok && onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete snippet');
    } finally {
      setDeleting(false);
    }
  };

  const lineCount = code.split('\n').length;
  const charCount = code.length;

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
            )}
          </div>
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800">
        <pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
          <code>{code}</code>
        </pre>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{language}</Badge>
            {tags && tags.length > 0 && (
              <div className="flex gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex gap-4">
            <span>{lineCount} lines</span>
            <span>{charCount} chars</span>
            <span>{copyCount} copies</span>
          </div>
          {authorName && <span>by {authorName}</span>}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          onClick={handleCopy}
          className="w-full"
          variant={copied ? 'default' : 'outline'}
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </div>
    </div>
  );
}
