import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MockDegreeHome from '../mock/MockDegreeHome'

beforeEach(() => render(<MockDegreeHome />))

describe('Degree Home Page UI Testing', () => {
    it('The Degree Home page should render the degree name at the top of the page', () => {
        const degreeName = screen.getByRole('paragraph', {name: /Mock Degree/i})
        expect(degreeName).toBeInTheDocument()
    })
});