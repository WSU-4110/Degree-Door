import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MockDegreeHome from '../mock/MockDegreeHome'

// Ali Farhat's Unit Testing
describe('Degree Home Page UI Testing', () => {
    beforeEach(() => render(<MockDegreeHome />))

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

// Patrick Ducusin's Unit Testing
describe('Login UI', () => {
  beforeEach(() => render(<MockLogin />))

  it('The login page should render a heading that says "Welcome to Degree Door" ', () => {

    const welcomeHeading = screen.getByRole('heading', {
      name: /Welcome to Degree Door/i,
    })

    expect(welcomeHeading).toBeInTheDocument()
  })

  it('The login page should render a paragraph that says "Login to Degree Door and get started on looking at your degree!" ', () => {

    const paragraph = screen.getByText('Login to Degree Door and get started on looking at your degree!')

    expect(paragraph).toBeInTheDocument()

  })

  it('The login page should rendera Sign In form with the heading "Sign In" ', () => {

    const signInHeading = screen.getByRole('heading', {name: /Sign In/i})

    expect(signInHeading).toBeInTheDocument()

  })

  it('The login page should render a Sign In Form with expty text fields', () => {
    expect(screen.getByRole('textbox', { name: "" })).toHaveValue("")
  })

  it('The login page Sign In Form should render a sign in button', () => {
    const loginButton = screen.getByRole('button', {name: /Sign in/i})
    expect(loginButton).toBeInTheDocument()
  })

  it('The login page Sign In Form should render a register button', () => {
    const registerButton = screen.getByRole('button', {name: /Don't have an account\? Sign up!/i})
    expect(registerButton).toBeInTheDocument()
  })

  it('The login page Sign In Form should render an anchor tag for the "Forgot Password?" page', () => {
    const forgotPasswordLink = screen.getByText('Forgot password?')

    expect(forgotPasswordLink).toBeInTheDocument()
  })
})