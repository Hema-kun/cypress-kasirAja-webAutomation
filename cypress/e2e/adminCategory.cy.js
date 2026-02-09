import signIn from "../fixtures/admin.json";

describe("Admin Category", () => {
  beforeEach("Masuk Dashboard", () => {
    cy.adminLogin(signIn.email, signIn.password);

    cy.xpath("//span[normalize-space()='Master Data']").click();
    cy.xpath("//span[normalize-space()='Category']").click();
    //    cy.url().should('include','/admin/Category')
  });

  it("Tambah category tanpa isi", () => {
    cy.xpath("//a[normalize-space()='Create']").click();
    cy.xpath("//button[normalize-space()='Buat']").click();
    cy.xpath("//input[@id='name']")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya.");
  });

  it("Tambah category valid", () => {
    cy.xpath("//a[normalize-space()='Create']").click();
    cy.xpath("//input[@id='name']").type("testing");
    cy.get("#select2-parent_id-container").click();
    cy.get("input[role='searchbox']").type("Cadar").wait(1000).type("{enter}");
    cy.get("#select2-status-container").click();
    cy.get("input[role='searchbox']").clear().type("Active");

    cy.get(".select2-dropdown.select2-dropdown--below")
      .contains(/^Active$/) // regex match persis "Active"
      .click();

    cy.xpath("//button[normalize-space()='Buat']").click();
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("input[type='search']").clear().type("testing").wait(1000);
    cy.get("#table-category_wrapper")
      .should("contain", "testing")
      .should("contain", "Cadar");
  });

  it("Edit category ", () => {
    cy.get("input[type='search']").type("testing").wait(1000);
    cy.xpath("(//a[@class='btn btn-primary btn-icon'])[1]").click();
    cy.xpath("//input[@id='name']").clear().type("testing2");
    cy.get("#select2-parent_id-container").click();
    cy.get("input[role='searchbox']")
      .clear()
      .type("Cadar")
      .wait(500)
      .type("{enter}");
    cy.get("#select2-status-container").click();
    cy.get("input[role='searchbox']").type("Active").click();

    cy.xpath("//button[normalize-space()='Ubah']").click();
    cy.get("input[type='search']").clear().type("testing2").wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("#table-category_wrapper")
      .should("contain", "testing2")
      .should("contain", "Cadar");
  });

  it("Hapus kategori tidak digunakan", () => {
    cy.get("input[type='search']").clear().type("testing2").wait(1000);
    cy.xpath("(//i[@class='mdi mdi-delete'])[1]").click();
    cy.xpath("//button[normalize-space()='Iya, hapus itu!']").click().wait(100);
    //cy.xpath("//button[normalize-space()='Kembali']").click()
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
  });

  it("Hapus kategori yang sedang digunakan", () => {
    cy.get("input[type='search']").clear().type("Hijab Instan").wait(1000);
    cy.xpath("(//i[@class='mdi mdi-delete'])[1]").click();
    cy.xpath("//button[normalize-space()='Iya, hapus itu!']").click().wait(100);
    //cy.xpath("//button[normalize-space()='Kembali']").click()
    cy.get(".swal2-popup").should("be.visible").and("contain", "Gagal");
  });
});
