import { render, screen } from '@testing-library/react'
import MockPost from '../mock/MockPost'
import '@testing-library/jest-dom'

// Before all tests run, render the MockPost component
beforeEach(() => render(<MockPost />))

describe('Create Post UI Testing', () => {
  it('The Create Post page should render a top label that says the name of the degree', () => {
    const degreeName = screen.getByText("Mock Degree")

    expect(degreeName).toBeInTheDocument()
  })

  it('The Navbar in Create Post should have a label that says "Overview"', () => {
    const overviewLabel = screen.getByText("OVERVIEW")

    expect(overviewLabel).toBeInTheDocument()
  })

  it('The Navbar in Create Post should have a label that says "Reviews"', () => {
    const reviewLabel = screen.getByText("REVIEWS")

    expect(reviewLabel).toBeInTheDocument()
  })

  it('The Navbar in Create Post should have a label that says "Post a Review"', () => {
    const postLabel = screen.getByText("POST A REVIEW")

    expect(postLabel).toBeInTheDocument()
  })

  it('The form in Create Post should have a button to submit', () => {
    const submitButton = screen.getByRole('button', {name: /SUBMIT/i})

    expect(submitButton).toBeInTheDocument()
  })

  it('The form in Create Post should have a button to go back', () => {
    const goBackButton = screen.getByRole('button', {name: /GO BACK/i})

    expect(goBackButton).toBeInTheDocument()
  })
})