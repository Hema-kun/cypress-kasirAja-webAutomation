import signIn from "../fixtures/admin.json"

describe('Admin Login & Logout', () => {

  it('should login with valid credentials', () => {
    cy.adminLogin(signIn.email, signIn.password)
    cy.title().should('include', 'Dashboard')
  })

  it('should not login with invalid credentials', () => {
    cy.adminLogin('admin@gmail.com', 'wrongpass')
    cy.get('span.invalid-feedback > strong').should('contain', 'Identitas tersebut tidak cocok dengan data kami.')
  })

  it('should show validation error if fields are empty', () => { 
    cy.adminLogin(' ', ' ')
    cy.get('input#email').invoke('prop', 'validationMessage')
  .should('contain','Silahkan isi kolomnya')
  })

  it('should show validation error if fields email not formated', () => { 
    cy.adminLogin('admin', '123123')
    cy.get('input#email').invoke('prop', 'validationMessage').should('contain',"Harap sertakan '@' di alamat email. ")
  })

  it('should logout properly', () => {
    cy.adminLogin(signIn.email, signIn.password)
    cy.adminLogout()
    cy.title().should('include', 'Beranda')
  })

  it('should not access dashboard when logged out', () => {
    cy.visit('/admin')
    cy.url().should('include', '/login/employer')
  })
})