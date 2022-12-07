import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockDegreeHome, MockLogin, MockPost,
MockRegister, MockResetPassword, MockReview } from '../mock'

// Ali Farhat's Unit Testing
describe('Degree Home Page UI Testing', () => {
    beforeEach(() => render(<MockDegreeHome />))
    afterEach(cleanup)

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
  afterEach(cleanup)

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

// Majeda Ullah's Unit Testing
describe('Create Post UI Testing', () => {
  beforeEach(() => render(<MockPost />))
  afterEach(cleanup)

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

// Zwar Ahmed's Unit Testing
describe('Register UI Testing', () => {
  beforeEach(() => render(<MockRegister />))
  afterEach(cleanup)

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

// Elijah Adeniji's Unit Testing
describe('Reset Password Page UI Testing', () => {
  beforeEach(() => render(<MockResetPassword />))
  afterEach(cleanup)

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

// Grey Slatina's Unit Testing
describe('Review Page UI Testing', () => {
  beforeEach(() => render(<MockReview />))
  afterEach(cleanup)

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