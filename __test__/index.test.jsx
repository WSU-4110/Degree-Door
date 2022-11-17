import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MockResetPassword from '../mock/MockResetPassword'

beforeEach(() => render(<MockResetPassword />))

describe('Reset Password Page UI Testing', () => {
    it('The Reset Password page should render a header that says "Reset Your Password!"', () => {
        const resetHeader = screen.getByRole('heading', {name: /Reset Your Password\!/i})
        expect(resetHeader).toBeInTheDocument()
    })

    it('The Reset Password page should render a form', () => {
        const resetForm = screen.getByTestId('resetForm')
        expect(resetForm).toBeInTheDocument()
    })

    it('The Reset Password form should render a heading that says "Reset Password', () => {
        const formHeading = screen.getByRole('heading', {name: /Reset Password/i})
        expect(formHeading).toBeInTheDocument()
    })

    it('The Reset Password form should render a text that prompts the user to enter an email', () => {
        const formPrompt = screen.getByText('Enter the email that is associated with your Degree Door account')
        expect(formPrompt).toBeInTheDocument()
    })

    it('The Reset Password form should have an empty textfield', () => {
        const formField = screen.getByRole('textbox')
        expect(formField).toBeInTheDocument()
    })

    it('The Reset Password form should have a button to send the password reset email', () => {
        const formSendEmailButton = screen.getByRole('button', {name: /Send password reset email\!/i})
        expect(formSendEmailButton).toBeInTheDocument()
    })
})