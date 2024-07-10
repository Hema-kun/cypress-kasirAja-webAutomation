import signInData from '../fixtures/account.json'

describe('Open KasirAja',()=>{
    beforeEach(('Visit Url kasirAja',()=>{
        cy.visit('/')
    }))

    it('Assert location login page',()=>{
        cy.location('pathname').should('equal','/login')
    })

    it('user cannot login by empty field',()=>{
        cy.get('#email').type(' ')
        cy.get('#password').type(' ')
        cy.contains('login').click()
        cy.get('.chakra-alert').should('exist').and('contain','"email" is not allowed to be empty')
    })

    it('user cannot login by wrong email',()=>{
        cy.get('#email').type('jack2@jo')
        cy.get('#password').type(' ')
        cy.contains('login').click()
        cy.get('.chakra-alert').should('exist').and('contain','"email" must be a valid email')
    })

    it('user cannot login by empty password',()=>{
        cy.get('#email').type('trial2-toko@gmail.com')
        cy.get('#password').type(' ')
        cy.contains('login').click()
        cy.get('.chakra-alert').should('exist').and('contain','Kredensial yang Anda berikan salah')
    })

    it('user cannot login by wrong password',()=>{
        cy.get('#email').type('trial2-toko@gmail.com')
        cy.get('#password').type(' ')
        cy.contains('login').click()
        cy.get('.chakra-alert').should('exist').and('contain','Kredensial yang Anda berikan salah')
    })

    it('user can login using email & password valid',()=>{
        cy.get('#email').type(signInData.email)
        cy.get('#password').type(signInData.password)
        cy.contains('login').click()
        cy.location('pathname').should('equal','/dashboard')
        cy.get('h3').should('contain','kasirAja')
    })
})