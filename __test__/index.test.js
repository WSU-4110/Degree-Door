import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MockReview from '../mock/MockReview'

// Before each unit test, render the MockReview component
beforeEach(() => render(<MockReview />))

describe('Review Page UI Testing', () => {
    it('Review Page should render a label at the top that says the degree', () => {
        const reviewDegreeLabel = screen.getByText("Mock Degree")
        expect(reviewDegreeLabel).toBeInTheDocument()
    })

    it('Review page should render a mock review whose course says "Mock Course"', () => {
        const courseTitle = screen.getByText("Mock Course")
        expect(courseTitle).toBeInTheDocument()
    })

    it('Review page should render a mock section of the review which says "PROS"', () => {
        const Pros = screen.getByText("PROS")
        expect(Pros).toBeInTheDocument()
    })

    it('Review page should render a mock section of the review which says "CONS"', () => {
        const Cons = screen.getByText("CONS")
        expect(Cons).toBeInTheDocument()
    })

    it('Review page should render a mock section to display the "OVERVIEW" of reviews', () => {
        const OVERVIEW = screen.getByText("OVERVIEW")
        expect(OVERVIEW).toBeInTheDocument()
    })

    it('Review page should render a most action to allow users to "POST A REVIEW"', () => {
        const POST = screen.getByText("POST A REVIEW")
        expect(POST).toBeInTheDocument()
    })

})