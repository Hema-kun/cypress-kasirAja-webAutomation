// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types = "cypress" />
/// <reference types = 'cypress-xpath' />

import "cypress-file-upload";
import "cypress-iframe";
require("cypress-downloadfile/lib/downloadFileCommand");
require("@4tw/cypress-drag-drop");

// custom command for interacting iframe
Cypress.Commands.add("getIframe", (iframe) => {
  cy.get(iframe)
    .its("0.contentDocument.body")
    .should("be.visible")
    .then(cy.wrap);
});

//custom command for clicking on link using labe
Cypress.Commands.add("clickLink", (label) => {
  cy.get("a").contains(label).click();
});

//custom command for Login admin
Cypress.Commands.add("adminLogin", (email, password) => {
  cy.visit('/login/employer');
  cy.get("input#email").type(email);
  cy.get("input#password").type(password);
  cy.get("button[type='submit']").click();
});

Cypress.Commands.add('adminLogout', () => {
  cy.get('a#profileDropdown').click();
  cy.get(".dropdown-item[href='https://wikanta.com/logout']").click();
})

//custom command for Login user
Cypress.Commands.add('userLogin', (email, password) => {
  cy.visit('/login')
  cy.get("input#email[type='email']").type(email)
  cy.get("input#password[type='password']").type(password)
  cy.xpath("//button[normalize-space()='Masuk']").click()
})

Cypress.Commands.add('userLogout', () => {
  cy.get("li[class='nav-item dropdown'] a[class='nav-link']").click();
  cy.xpath("//a[normalize-space()='Keluar']").click()
})
