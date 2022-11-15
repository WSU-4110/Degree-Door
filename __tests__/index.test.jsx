import { render, screen } from '@testing-library/react'
import MockLogin from '../mock_components/MockLogin'
import '@testing-library/jest-dom'

// Before all tests run, we need to render the MockLogin component
beforeEach(() => render(<MockLogin />))

// Group unit tests together with the 'describe' function.
// This test suite will test whether the Login page is rendered correctly.
describe('Login UI', () => {
  it('The login page should render a heading that says "Welcome tp Degree Door" ', () => {

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

  it('The login page Sign In Form should render two buttons', () => {
    const loginButton = screen.getByRole('button', {name: /Sign in/i})
    const registerButton = screen.getByRole('button', {name: /Don't have an account\? Sign up!/i})
    expect(loginButton).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
  })

  it('The login page Sign In Form should render an anchor tag for the "Forgot Password?" page', () => {
    const forgotPasswordLink = screen.getByText('Forgot password?')

    expect(forgotPasswordLink).toBeInTheDocument()
  })
})