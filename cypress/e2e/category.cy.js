import signInData from '../fixtures/account.json'

describe('Create category', ()=>{

    beforeEach(()=>{
        cy.visit('/')
        cy.get('#email').type(signInData.email)
        cy.get('#password').type(signInData.password)
        cy.get('button[type="submit"]').click();
    })

    it('Positive - should create a new category successfully',()=>{
        cy.get('.chakra-stack').contains('kategori').click()
        cy.get('.chakra-button').contains('tambah').click()
        cy.get('#nama').type('test category1')
        cy.get('#deskripsi').type('test category1 description')
        cy.get('.chakra-button').contains('simpan').click()
        cy.get('div.chakra-alert__title').should('contain','success');

    })

    it('Positive - should have value "test category1" in list',()=>{
        cy.get('.chakra-stack').contains('kategori').click()
        cy.get('.chakra-input').type('test category1')
        cy.get('.chakra-table').should('contain','test category1')

    })

    it('Negative - display error message when "nama" field is empty',()=>{
        cy.get('.chakra-stack').contains('kategori').click()
        cy.get('.chakra-button').contains('tambah').click()
        cy.get('#nama').clear()
        cy.get('#deskripsi').type('test category1 description')
        cy.get('.chakra-button').contains('simpan').click()
        cy.get('div.chakra-alert').should('contain','"name" is not allowed to be empty');

    })
})