import signInData from '../fixtures/account.json';

describe('create Penjualan',()=>{
    beforeEach(('visit login page',()=>{
        cy.visit('/');
        cy.get('#email').type(signInData.email);
        cy.get('#password').type(signInData.password);
        cy.contains('Login').click();
    }));

    it((''))

})