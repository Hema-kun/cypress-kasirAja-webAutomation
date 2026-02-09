import signIn from "../fixtures/user.json";

describe("User Keranjang", () => {
  beforeEach("Masuk beranda", () => {
    cy.userLogin(signIn.email, signIn.password);
    cy.title().should("include", "Beranda");
  });

  it("Check keranjang kosong", () => {
    cy.get("a[href='https://wikanta.com/cart']").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  });

  it("Check masukkan produk stock 0", () => {
    cy.xpath("//a[normalize-space()='Kemeja Pria Polos Kerah']").click();
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Stok produk ini adalah 0");
    cy.get("#shop-now").click();
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Stok produk ini adalah 0");
  });

  it("Check masukkan produk stock 1", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']").first()
      .click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
  });

  it("Check increment produk dikeranjang", () => {
    cy.get("a[href='https://wikanta.com/cart']").click();
    cy.get("  input[placeholder='Kuantitas']").clear().type("10").type("{enter}");
    cy.get(".cart-total.d-block.mb-2").scrollIntoView().should("contain", "Rp 100.000");
  });

  it("Check hapus produk di keranjang", () => {
    cy.get("a[href='https://wikanta.com/cart']").click();
    cy.get(".btn-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  }); 
});
