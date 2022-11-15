import { render, screen } from '@testing-library/react'
import MockRegister from '../Mock_Conponent/MockRegister'
import '@testing-library/jest-dom'

// Before running tests, render the mock component
beforeEach(() => render(<MockRegister />))


describe('Register UI Testing', () => {

  it('The Registration Page should render a heading that says "Sign up for Degree Door!"', () => {
    const signUpHeading = screen.getByRole('heading', {name: /Sign up for Degree Door\!/i})
    expect(signUpHeading).toBeInTheDocument()
  })

  it('The Registration Page should render a label that says "First Name" above the first name section', () => {
    const firstNameHeading = screen.getByText("First Name")
    expect(firstNameHeading).toBeInTheDocument()
  })

  it('The Registration Page should render a label that says "Last Name" above the last name section', () => {
    const lastNameHeading = screen.getByText("Last Name")
    expect(lastNameHeading).toBeInTheDocument()
  })

  it('The Registration Page should render a label that says "Email" above the Email section', () => {
    const emailHeading = screen.getByText("Email")
    expect(emailHeading).toBeInTheDocument()
  })

  it('The Registeration Form should render a sign up button', () => {
    const signUpButton = screen.getByRole('button', {name: /Sign-up\!/i})
    expect(signUpButton).toBeInTheDocument()
  })

  it('The Registeration Form should render a log in button', () => {
    const returnToLoginButton = screen.getByRole('button', {name: /Return to login\!/i})
    expect(returnToLoginButton).toBeInTheDocument()
  })

})

