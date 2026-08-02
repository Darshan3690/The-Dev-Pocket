import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectsPage from '@/app/dashboard/projects/page'

jest.mock('@clerk/nextjs', () => ({
  useUser: () => ({ isSignedIn: false })
}))

jest.mock('@/lib/bookmarks', () => ({
  localBookmarks: { add: jest.fn(() => ({ id: '1' })) },
  apiBookmarks: { add: jest.fn() }
}))

jest.mock('react-hot-toast', () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}))

import { localBookmarks } from '@/lib/bookmarks'

describe('ProjectsPage - filters, generate, start project', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders a fixed-size set of recommendations on load, not a single hardcoded list', () => {
    render(<ProjectsPage />)
    const cards = screen.getAllByText(/Start Project|Saved to Bookmarks/)
    expect(cards.length).toBe(4)
  })

  it('changes recommendations when a category filter is selected', () => {
    render(<ProjectsPage />)

    const beforeTitles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)

    fireEvent.click(screen.getByText('AI/ML Projects'))

    const afterTitles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    const aiTitles = ['Sentiment Analyzer', 'Image Caption Generator', 'AI Chat Assistant']
    afterTitles.forEach((title) => {
      expect(aiTitles).toContain(title)
    })
    expect(afterTitles).not.toEqual(beforeTitles)
  })

  it('changes recommendations when skill level is selected', () => {
    render(<ProjectsPage />)

    fireEvent.click(screen.getByText('AI/ML Projects'))
    fireEvent.click(screen.getByText('beginner'))

    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(titles).toEqual(['Sentiment Analyzer'])
  })

  it('regenerates recommendations when Generate Project Ideas is clicked', async () => {
    render(<ProjectsPage />)

    fireEvent.click(screen.getByText('Generate Project Ideas'))
    expect(screen.getByText('Generating Ideas...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Generate Project Ideas')).toBeInTheDocument()
    })
  })

  it('saves a project to bookmarks and disables the button when Start Project is clicked', async () => {
    render(<ProjectsPage />)

    const startButtons = screen.getAllByText('Start Project')
    fireEvent.click(startButtons[0])

    await waitFor(() => {
      expect(localBookmarks.add).toHaveBeenCalledTimes(1)
    })
    expect(screen.getAllByText('Saved to Bookmarks').length).toBe(1)
  })
})