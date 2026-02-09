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

  it("Tambah artikel tanpa judul", () => {
    cy.get("a[class='btn btn-primary']").click();
    cy.get("textarea#summary").type("test");
    cy.get(".select2-selection").click();
    cy.get(".select2-results__option")
      .contains(/^Active$/) // regex match persis "Active"
      .click();
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

  it("Tambah artikel", () => {
    cy.get("a[class='btn btn-primary']").click();

    cy.get("input[placeholder='Title']").type("test");
    cy.frameLoaded("iframe[title='Rich Text Editor, article_section_1']");
    cy.iframe("iframe[title='Rich Text Editor, article_section_1']")
      .clear()
      .type("welcome {cmd+a}");
    cy.get("textarea#summary").type("test");
    cy.get("button[class='btn btn-primary btn-next']").scrollIntoView();
    cy.get(".select2-selection").click();
    cy.get(".select2-results__option")
      .contains(/^Active$/) // regex match persis "Active"
      .click();
    cy.wait(2000);
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-info _btnCategory_']").click();
    cy.wait(2000);
    cy.get(
      ".col-md > .form-group > .select2 > .selection > .select2-selection"
    ).click();
    cy.get("input[role='searchbox']").type("Rohani").type("{enter}");
    cy.get("#btnContinueCategory").click();
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("input[name='image[file][]']").attachFile("test.png");
    cy.get("textarea[placeholder='Note']").type("test");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("#table-post_wrapper").should("contain", "test");
  });

  it("Edit artikel", () => {
    cy.xpath("(//a[@class='btn btn-primary btn-icon'])[4]").click();

    cy.get("input[placeholder='Title']").clear().type("test2");
    cy.frameLoaded("iframe[title='Rich Text Editor, article_section_1']");
    cy.iframe("iframe[title='Rich Text Editor, article_section_1']")
      .clear()
      .type("welcome {cmd+a}");
    cy.get("textarea#summary").clear().type("test");
    cy.get("button[class='btn btn-primary btn-next']").scrollIntoView();
    cy.get(".select2-selection").click();
    cy.get(".select2-results__option")
      .contains(/^Active$/) // regex match persis "Active"
      .click();
    cy.wait(2000);
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("#table-post_wrapper").should("contain", "test2");
  });

  it("Hapus artikel - ", () => {
    cy.xpath("(//button[@name='button'])[4]").click();
    cy.xpath("//button[normalize-space()='Iya, hapus itu!']").click();
    cy.get("#table-post_wrapper").should("not.contain", "test2");
  });
});
