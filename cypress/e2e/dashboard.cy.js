import signInData from '../fixtures/account.json'

describe('Open dashboard kasirAja',()=>{
    beforeEach(('Visit dashboard by login',()=>{
        cy.visit('/')
        cy.get('#email').type(signInData.email)
        cy.get('#password').type(signInData.password)
        cy.contains('login').click()
    }))

    context('Aside left navbar Section',()=>{
        it('Aside Section : Dashboard navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('dashboard').click()
            cy.get('.css-13pc7q0').eq(0).should('contain','trial2')
        })

        it('Aside Section : Penjualan navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('penjualan').click()
            cy.get('.chakra-heading').should('contain','penjualan')
        })

        it('Aside Section : Pembelian navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('pembelian').click()
            cy.get('.css-tyo1sz').should('contain','pembelian')
        })

        it('Aside Section : kategori navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('kategori').click()
            cy.get('.css-tyo1sz').should('contain','kategori')
        })

        it('Aside Section : Produkn navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('produk').click()
            cy.get('.css-tyo1sz').should('contain','produk')
        })

        it('Aside Section : Pengguna navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('pengguna').click()
            cy.get('.css-tyo1sz').should('contain','pengguna')
        })

        it('Aside Section : Pelanggan navbar',()=>{
            cy.get('.chakra-stack').find("a").contains('pelanggan').click()
            cy.get('.css-tyo1sz').should('contain','pelanggan')
        })
    })
})