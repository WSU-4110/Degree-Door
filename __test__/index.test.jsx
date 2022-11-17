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
    //Unite Test 2
    it('The Degree Home page should render the degree logo at the top of the page', () => {
        const degreeImg = screen.getAllByRole('img' )
        expect(degreeImg).toBeInTheDocument()
    })
    //Unit Test 3
    it('The Degree Home page should render dropdown on the page', () => {
        const degreeDropdown = screen.getByText('Overview')
        expect(degreeDropdown).toBeInTheDocument()
    })
    //Unit Test 4
    it('The Degree Home page should render and use the userid', () => {
        const degreeUserID = screen.getByTestId(userID, 'user1234')
        expect(degreeUserID).toBeInTheDocument()
    })
    //Unit Test 5
    it('The Degree Home page should render the degree description on the page', () => {
        const degreeDescription = screen.getByText('Mock Degree Description')
        expect(degreeDescription).toBeInTheDocument()
    })
    //Unit Test 6
    it('The Degree Home page should render the link to the Wayne State CSC program', () => {
        const degreeLink = screen.getByRole('link').toHaveAttribute('href', 'https://engineering.wayne.edu/computer-science')
        expect(degreeLink).toBeInTheDocument();
        //expect(screen.getByText('Click here for more information about Wayne States Computer Science Program!').closest('a')).toHaveAttribute('href', 'https://engineering.wayne.edu/computer-science')
    })
});
