import signIn from "../fixtures/admin.json";

describe("Admin Artikel", () => {
  beforeEach("Masuk Dashboard", () => {
    cy.adminLogin(signIn.email, signIn.password);

    cy.get(":nth-child(6) > [data-toggle='collapse'] > .menu-arrow").click();
    cy.get(
      "#sidebar-menu-266 > .nav > .nav-item > .nav-link > .menu-title"
    ).click();
    //    cy.url().should('include','/admin/post')
  });

  it("Tambah artikel", () => {
    cy.get("a[class='btn btn-primary']").click();
    cy.get("input[placeholder='Title']").type("test");
    cy.frameLoaded(".cke_wysiwyg_frame")
    cy.iframe(".cke_wysiwyg_frame").clear().type("welcome {cmd+a}");
    cy.get("textarea#summary").type("test");
    cy.get(".select2-selection").click();
    cy.get(".select2-search__field").type("Active {enter}");
    cy.get("button[class='btn btn-primary btn-next']").scrollIntoView().click()
    cy.get(".input-group-prepend > .btn").click()
    cy.get("#select2-category-op-container").click
    cy.get("input[role='searchbox']").type("Rohani {enter}")
    cy.get("#btnContinueCategory").click()
        cy.get("button[class='btn btn-primary btn-next']").click()
    cy.get("input[name='image[file][]']").attachFile('')
    cy.get("textarea[placeholder='Note']").type("test")

  });

  it.only("Tambah artikel tanpa judul", () => {
    cy.get("a[class='btn btn-primary']").click();
    cy.get("textarea#summary").type("test");
    cy.get(".select2-selection").click();
    cy.get(".select2-search__field").type("Active {enter}");
    cy.get(".direction > .btn-primary").scrollIntoView().click();
    cy.wait(300); // kalau muncul terlalu cepat lalu hilang
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Harap isi formulir");
  });

  it("Tambah artikel tanpa konten", () => {
    cy.get("a[class='btn btn-primary']").click();
    cy.get("input[placeholder='Title']").type("test");
    cy.get(".direction > .btn-primary").scrollIntoView().click();
    cy.wait(300); // kalau muncul terlalu cepat lalu hilang
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Harap isi formulir");
  });
});
