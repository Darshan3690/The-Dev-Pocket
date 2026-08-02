import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GlobalSearch from '@/app/components/GlobalSearch'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push })
}))

const RECENT_SEARCHES_KEY = 'dev-pocket-recent-searches'

describe('GlobalSearch - recent searches', () => {
  beforeEach(() => {
    localStorage.clear()
    push.mockClear()
    // GlobalSearch calls /api/resources for any query >= 2 chars - stub it
    // out so tests are deterministic and don't depend on the network.
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ resources: [] })
    }) as unknown as typeof fetch
  })

  const openSearch = () => {
    fireEvent.click(screen.getByLabelText('Open search'))
  }

  it('renders with no recent searches and does not crash', () => {
    render(<GlobalSearch />)
    openSearch()
    expect(screen.queryByText('Recent Searches')).not.toBeInTheDocument()
  })

  it('loads previously saved recent searches from localStorage on mount', async () => {
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify([{ query: 'dashboard', url: '/dashboard', title: 'Dashboard' }])
    )

    render(<GlobalSearch />)
    openSearch()
    fireEvent.focus(screen.getByPlaceholderText('Search pages, resources, features...'))

    await waitFor(() => {
      expect(screen.getByText('Recent Searches')).toBeInTheDocument()
    })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('saves a search to localStorage and navigates when a result is selected', async () => {
    render(<GlobalSearch />)
    openSearch()

    const input = screen.getByPlaceholderText('Search pages, resources, features...')
    fireEvent.change(input, { target: { value: 'Dashboard' } })

    const result = await screen.findByText('Dashboard')
    fireEvent.click(result)

    expect(push).toHaveBeenCalledWith('/dashboard')

    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({ url: '/dashboard', title: 'Dashboard' })
  })

  it('dedupes by url, moving a re-selected search back to the front', async () => {
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify([
        { query: 'notes', url: '/dashboard/notes', title: 'Notes' },
        { query: 'dashboard', url: '/dashboard', title: 'Dashboard' }
      ])
    )

    render(<GlobalSearch />)
    openSearch()

    const input = screen.getByPlaceholderText('Search pages, resources, features...')
    fireEvent.change(input, { target: { value: 'Notes' } })

    const result = await screen.findByText('Notes')
    fireEvent.click(result)

    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]')
    expect(stored).toHaveLength(2)
    expect(stored[0].url).toBe('/dashboard/notes')
  })

  it('caps recent searches at 5 entries', async () => {
    const five = Array.from({ length: 5 }, (_, i) => ({
      query: `q${i}`,
      url: `/page-${i}`,
      title: `Page ${i}`
    }))
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(five))

    render(<GlobalSearch />)
    openSearch()

    const input = screen.getByPlaceholderText('Search pages, resources, features...')
    fireEvent.change(input, { target: { value: 'Dashboard' } })

    const result = await screen.findByText('Dashboard')
    fireEvent.click(result)

    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]')
    expect(stored).toHaveLength(5)
    expect(stored[0].url).toBe('/dashboard')
  })

  it('clears recent searches from state and localStorage', async () => {
    localStorage.setItem(
      RECENT_SEARCHES_KEY,
      JSON.stringify([{ query: 'dashboard', url: '/dashboard', title: 'Dashboard' }])
    )

    render(<GlobalSearch />)
    openSearch()
    fireEvent.focus(screen.getByPlaceholderText('Search pages, resources, features...'))

    await waitFor(() => {
      expect(screen.getByText('Recent Searches')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Clear'))

    expect(localStorage.getItem(RECENT_SEARCHES_KEY)).toBeNull()
  })

  it('renders Popular Searches without fabricated counts', () => {
    render(<GlobalSearch />)
    openSearch()

    expect(screen.getByText('dashboard')).toBeInTheDocument()
    expect(screen.queryByText(/\(\d+\)/)).not.toBeInTheDocument()
  })
})