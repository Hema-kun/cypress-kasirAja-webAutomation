import signIn from "../fixtures/user.json";

describe("User Kategori", () => {
  beforeEach("Masuk beranda",() => {
    cy.userLogin(signIn.email, signIn.password);
    cy.title().should("include", "Beranda");
  });

  it("Check kategori berisi produk", () => {
    cy.get(".toggle-bar-wrapper").scrollIntoView().trigger('mouseenter')
    cy.get(":nth-child(3) > #dropdownCategory-1").trigger("mouseenter")
    cy.contains('a', 'Pashima').click()
    cy.get(".product-info").should("contain","Pashmina")
    
  });

  it("Check kategori tidak berisi produk", () => {
    cy.get(".toggle-bar-wrapper").scrollIntoView().trigger('mouseenter')
    cy.get(":nth-child(5) > #dropdownCategory-1").trigger("mouseenter")
    cy.contains('a', 'Vest Muslim').click()
    cy.get(":nth-child(2) > .text-center").should("contain","Tidak ada data yang cocok")
    
  });

});
