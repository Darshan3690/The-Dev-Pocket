import { localBookmarks, apiBookmarks, type Bookmark } from '@/lib/bookmarks'
import { randomUUID } from 'crypto'

// jsdom's environment doesn't implement crypto.randomUUID, but lib/bookmarks.ts
// relies on it (crypto.randomUUID()) when adding a bookmark. Polyfill it with
// Node's real implementation, scoped to this file only.
if (typeof globalThis.crypto === 'undefined') {
  // @ts-expect-error - minimal polyfill for test environment only
  globalThis.crypto = {}
}
if (typeof globalThis.crypto.randomUUID !== 'function') {
  // @ts-expect-error - Node's randomUUID signature is compatible enough for this use
  globalThis.crypto.randomUUID = randomUUID
}

describe('localBookmarks (guest / localStorage path)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a bookmark with tags and persists it', () => {
    const created = localBookmarks.add({
      title: 'React Docs',
      url: 'https://react.dev',
      category: 'Frontend',
      tags: ['react', 'docs']
    })

    expect(created.id).toBeTruthy()
    expect(created.createdAt).toBeTruthy()
    expect(created.tags).toEqual(['react', 'docs'])

    const all = localBookmarks.getAll()
    expect(all).toHaveLength(1)
    expect(all[0].tags).toEqual(['react', 'docs'])
  })

  it('defaults to an empty tags array when none are provided', () => {
    const created = localBookmarks.add({
      title: 'No Tags',
      url: 'https://example.com',
      category: 'General',
      tags: []
    })

    expect(created.tags).toEqual([])
  })

  it('rejects a duplicate URL', () => {
    localBookmarks.add({
      title: 'First',
      url: 'https://duplicate.com',
      category: 'General',
      tags: []
    })

    expect(() =>
      localBookmarks.add({
        title: 'Second',
        url: 'https://duplicate.com',
        category: 'General',
        tags: []
      })
    ).toThrow('Bookmark already exists')
  })

  it('updates an existing bookmark in place (no duplicate entry, tags overwritten)', () => {
    const created = localBookmarks.add({
      title: 'Old Title',
      url: 'https://example.com',
      category: 'General',
      tags: ['old']
    })

    const updated = localBookmarks.update(created.id, {
      title: 'New Title',
      tags: ['new', 'updated']
    })

    expect(updated.id).toBe(created.id)
    expect(updated.title).toBe('New Title')
    expect(updated.tags).toEqual(['new', 'updated'])
    // untouched fields are preserved
    expect(updated.url).toBe('https://example.com')
    expect(updated.category).toBe('General')

    const all = localBookmarks.getAll()
    expect(all).toHaveLength(1)
    expect(all[0].title).toBe('New Title')
  })

  it('throws when updating a bookmark that does not exist', () => {
    expect(() =>
      localBookmarks.update('nonexistent-id', { title: 'x' })
    ).toThrow('Bookmark not found')
  })

  it('removes a bookmark by id', () => {
    const created = localBookmarks.add({
      title: 'To Delete',
      url: 'https://delete-me.com',
      category: 'General',
      tags: []
    })

    localBookmarks.remove(created.id)

    expect(localBookmarks.getAll()).toHaveLength(0)
  })
})

describe('apiBookmarks (signed-in / API path)', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch
    jest.resetAllMocks()
  })

  it('sends tags through on add', async () => {
    const mockBookmark: Bookmark = {
      id: '1',
      title: 'React Docs',
      url: 'https://react.dev',
      category: 'Frontend',
      tags: ['react', 'docs'],
      createdAt: new Date().toISOString()
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ bookmark: mockBookmark })
    }) as unknown as typeof fetch

    const result = await apiBookmarks.add({
      title: 'React Docs',
      url: 'https://react.dev',
      category: 'Frontend',
      tags: ['react', 'docs']
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/bookmarks',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          title: 'React Docs',
          url: 'https://react.dev',
          category: 'Frontend',
          tags: ['react', 'docs']
        })
      })
    )
    expect(result.tags).toEqual(['react', 'docs'])
  })

  it('calls PATCH with the id and updated fields when updating', async () => {
    const updatedBookmark: Bookmark = {
      id: '42',
      title: 'Updated Title',
      url: 'https://example.com',
      category: 'General',
      tags: ['updated'],
      createdAt: new Date().toISOString()
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ bookmark: updatedBookmark })
    }) as unknown as typeof fetch

    const result = await apiBookmarks.update('42', {
      title: 'Updated Title',
      tags: ['updated']
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/bookmarks/42',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ title: 'Updated Title', tags: ['updated'] })
      })
    )
    expect(result.title).toBe('Updated Title')
    expect(result.tags).toEqual(['updated'])
  })

  it('throws with the server error message when update fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Bookmark not found' })
    }) as unknown as typeof fetch

    await expect(
      apiBookmarks.update('missing-id', { title: 'x' })
    ).rejects.toThrow('Bookmark not found')
  })
})