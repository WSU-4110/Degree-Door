import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MockDegreeHome from '../mock/MockDegreeHome'

beforeEach(() => render(<MockDegreeHome />))

describe('Degree Home Page UI Testing', () => {
    //Unit Test 1
    it('The Degree Home page should render the degree header at the top of the page', () => {
        const degreeHeader = screen.getByText('Mock Degree Header')
        expect(degreeHeader).toBeInTheDocument()
    })
    //Unit Test 2
    it('The Degree Home page should render the degree grid with information on the page', () => {
        const degreeImg = screen.getByTestId('degreegridinfo')
        expect(degreeImg).toBeInTheDocument()
    })
    //Unit Test 3
    it('The Degree Home page should render degree name and descriptions on the page', () => {
        const degreeDegreeNameDescription = screen.getByTestId('degreenamedescription')
        expect(degreeDegreeNameDescription).toBeInTheDocument()
    })
    //Unit Test 4
    it('The Degree Home page should render and use the hi test id for the navbar', () => {
        const degreeUserID = screen.getByTestId('nav')
        expect(degreeUserID).toBeInTheDocument()
    })
    //Unit Test 5
    it('The Degree Home page should render the degree description on the page', () => {
        const degreeDescription = screen.getByText('Mock Degree Description')
        expect(degreeDescription).toBeInTheDocument()
    })
    //Unit Test 6
    it('The Degree Home page should render the link to the Wayne State CSC program', () => {
        expect(screen.getByText('Click here for more information about Wayne States Computer Science Program!').closest('a')).toHaveAttribute('href', 'https://engineering.wayne.edu/computer-science')
    })
});
