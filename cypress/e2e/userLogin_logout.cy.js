import signIn from "../fixtures/user.json"

describe('User Login & Logout', () => {

  it('should login with valid credentials', () => {
    cy.userLogin(signIn.email, signIn.password)
    cy.title().should('include', 'Beranda')
  })

  it('should not login with invalid credentials', () => {
    cy.userLogin('admin@gmail.com', 'wrongpass')
    cy.get('span.invalid-feedback > strong').should('contain', 'Identitas tersebut tidak cocok dengan data kami.')
  })

  it('should show validation error if fields are empty', () => { 
    cy.userLogin(' ', ' ')
    cy.get('input#email').invoke('prop', 'validationMessage')
  .should('contain','Silahkan isi kolomnya')
  })

  it('should show validation error if fields email not formated', () => { 
    cy.userLogin('user', '123123')
    cy.get('input#email').invoke('prop', 'validationMessage').should('contain',"Harap sertakan '@' di alamat email. ")
  })

  it('should logout properly', () => {
    cy.userLogin(signIn.email, signIn.password)
    cy.userLogout()
    cy.title().should('include', 'Beranda')
  })

  it('should not access dashboard when logged out', () => {
    cy.visit('/account/profile')
    cy.url().should('include', '/login')
  })
})