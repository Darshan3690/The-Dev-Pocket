import { render, screen, fireEvent } from '@testing-library/react'
import NotesPage from '@/app/dashboard/notes/page'

jest.mock('@/lib/toast', () => ({
  showError: jest.fn()
}))

describe('NotesPage - view, edit, delete', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem(
      'dev-pocket-notes',
      JSON.stringify([
        { id: 1, title: 'First Note', content: 'Full content of the first note', date: '2025-01-01' }
      ])
    )
  })

  it('opens a modal with the full note when View Details is clicked', () => {
    render(<NotesPage />)

    fireEvent.click(screen.getByText('View Details'))

    // heading shows the full title (modal uses h2, distinguishing it from
    // the card's h3) - confirms View Details actually opens something now
    expect(screen.getByRole('heading', { name: 'First Note', level: 2 })).toBeInTheDocument()
    expect(screen.getAllByText('Full content of the first note').length).toBeGreaterThan(0)
  })

  it('opens the edit form pre-filled when Edit is clicked from the view modal', () => {
    render(<NotesPage />)

    fireEvent.click(screen.getByText('View Details'))
    fireEvent.click(screen.getByText('Edit'))

    expect(screen.getByRole('heading', { name: 'Edit Note' })).toBeInTheDocument()
    expect(screen.getByDisplayValue('First Note')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Full content of the first note')).toBeInTheDocument()
  })

  it('saves changes to an existing note instead of creating a new one', () => {
    render(<NotesPage />)

    fireEvent.click(screen.getByText('View Details'))
    fireEvent.click(screen.getByText('Edit'))

    const titleInput = screen.getByDisplayValue('First Note')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    fireEvent.click(screen.getByText('Save Changes'))

    expect(screen.getByText('Updated Title')).toBeInTheDocument()
    expect(screen.queryByText('First Note')).not.toBeInTheDocument()

    const stored = JSON.parse(localStorage.getItem('dev-pocket-notes') || '[]')
    expect(stored).toHaveLength(1) // updated in place, not duplicated
    expect(stored[0].title).toBe('Updated Title')
  })

  it('does not delete a note when the confirmation is cancelled', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false)
    render(<NotesPage />)

    fireEvent.click(screen.getByTitle('Delete note'))

    expect(confirmSpy).toHaveBeenCalled()
    expect(screen.getByText('First Note')).toBeInTheDocument()
    confirmSpy.mockRestore()
  })

  it('deletes a note when the confirmation is accepted', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true)
    render(<NotesPage />)

    fireEvent.click(screen.getByTitle('Delete note'))

    expect(screen.queryByText('First Note')).not.toBeInTheDocument()
    confirmSpy.mockRestore()
  })

  it('the Add New Note button opens a blank form, not a stale edit', () => {
    render(<NotesPage />)

    fireEvent.click(screen.getByText('View Details'))
    fireEvent.click(screen.getByText('Edit'))
    fireEvent.click(screen.getByText('Cancel'))

    fireEvent.click(screen.getByText('Add New Note'))

    expect(screen.getByRole('heading', { name: 'Create New Note' })).toBeInTheDocument()
    expect(screen.queryByDisplayValue('First Note')).not.toBeInTheDocument()
  })
})