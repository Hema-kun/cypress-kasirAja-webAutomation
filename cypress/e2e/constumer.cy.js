import signInData from '../fixtures/account.json'

describe('create customer',()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.get('#email').type(signInData.email)
        cy.get('#password').type(signInData.password)
        cy.get('button[type="submit"]').click();
    })

    it('Positive - Should create a new customer successfully',()=>{
        cy.get('.chakra-stack').contains('pelanggan').click()
        cy.get('.chakra-button').contains('tambah').click()
        cy.get('#nama').type('Test Pelanggan')
        cy.get('[data="no.hp,,function () { [native code] }"]').type('083896627070')
        cy.get('#alamat').type('RawaMangun')
        cy.get('#keterangan').type('Uji coba Akun')
        cy.get('.chakra-button').contains('simpan').click()
        cy.get('.chakra-alert').should('be.visible').and('contain','item ditambahkan')
    })

    it('Positive - Should have value "Test Pelanggan" in list',()=>{
        cy.get('.chakra-stack').contains('pelanggan').click()
        cy.get('.chakra-input').type('Test Pelanggan')
        cy.get('.chakra-table').should('contain',
        'Test Pelanggan')
    })

    it('Negative -  should show an error when empty nama field',()=>{
        cy.get('.chakra-stack').contains('pelanggan').click()
        cy.get('.chakra-button').contains('tambah').click()
        cy.get('#nama').clear()
        cy.get('[data="no.hp,,function () { [native code] }"]').type('083896627070')
        cy.get('#alamat').type('RawaMangun')
        cy.get('#keterangan').type('Uji coba Akun')
        cy.get('.chakra-button').contains('simpan').click()
        cy.get('.chakra-alert').should('be.visible').and('contain','"name" is not allowed to be empty')
    })

    it('Negative -  should show an error when entering invalid data type on phone field',()=>{
        cy.get('.chakra-stack').contains('pelanggan').click()
        cy.get('.chakra-button').contains('tambah').click()
        cy.get('#nama').type('Test Pelanggan')
        cy.get('[data="no.hp,,function () { [native code] }"]').type('Test')
        cy.get('#alamat').type('RawaMangun')
        cy.get('#keterangan').type('Uji coba Akun')
        cy.get('.chakra-button').contains('simpan').click()
        cy.get('.chakra-alert').should('be.visible').and('contain','"phone" must be a number')
    })
})