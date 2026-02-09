import signIn from "../fixtures/admin.json";

describe("Admin Produk list", () => {
  beforeEach("Masuk Dashboard", () => {
    cy.adminLogin(signIn.email, signIn.password);

    cy.xpath("//span[normalize-space()='Product']").click();
    cy.xpath("//span[normalize-space()='Product List']").click();
    //    cy.url().should('include','/admin/Product')
  });

  it("Tambah produk tanpa nama", () => {
    cy.xpath("//a[normalize-space()='Create']").click();
    cy.get("button[class='btn btn-primary btn-next']").click();
    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Harap isi formulir");
  });

  it("Tambah produk tanpa harga", () => {
    cy.xpath("//a[normalize-space()='Create']").click();

    cy.get("input[placeholder='Product Name']").type("test");
    cy.get("input[placeholder='Product SKU']").type("test");
    cy.get("input[placeholder='Product Barcode']").type("test");
    cy.get("input[placeholder='Product Weight']").type("10");
    cy.get("input[placeholder='Product Width']").type("10");
    cy.get("input[placeholder='Product Height']").type("10");
    cy.get("input[placeholder='Product Length']").type("10");
    cy.get("input[placeholder='Product Minimum Quantity']").type("10");
    cy.get("#select2-type-container").click();
    cy.get("input[role='searchbox']").type("Ready Order").type("{enter}");
    cy.get("#select2-kind-container").click();
    cy.get("input[role='searchbox']").type("Finish Good").type("{enter}");
    cy.frameLoaded("iframe[title='Rich Text Editor, summary-ckeditor']");
    cy.iframe("iframe[title='Rich Text Editor, summary-ckeditor']")
      .clear()
      .type("Welcome");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get(".swal2-popup")
      .should("be.visible")
      .and("contain", "Harap isi formulir");
  });

  it("Tambah produk valid", () => {
    cy.xpath("//a[normalize-space()='Create']").click();

    cy.get("input[placeholder='Product Name']").type("test");
    cy.get("input[placeholder='Product SKU']").type("test");
    cy.get("input[placeholder='Product Barcode']").type("test");
    cy.get("input[placeholder='Product Weight']").type("10");
    cy.get("input[placeholder='Product Width']").type("10");
    cy.get("input[placeholder='Product Height']").type("10");
    cy.get("input[placeholder='Product Length']").type("10");
    cy.get("input[placeholder='Product Minimum Quantity']").type("10");
    cy.get("#select2-type-container").click();
    cy.get("input[role='searchbox']").type("Ready Order").type("{enter}");
    cy.get("#select2-kind-container").click();
    cy.get("input[role='searchbox']").type("Finish Good").type("{enter}");
    cy.frameLoaded("iframe[title='Rich Text Editor, summary-ckeditor']");
    cy.iframe("iframe[title='Rich Text Editor, summary-ckeditor']")
      .clear()
      .type("Welcome");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("input[placeholder='Price']").type("10");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[data-model='Category']").click().wait(500);
    cy.xpath("(//span[@role='combobox'])[3]").click();
    cy.get("input[role='searchbox']").type("Jilbab").type("{enter}");
    cy.xpath("(//span[@role='combobox'])[4]").click();
    cy.get("input[role='searchbox']").type("Cadar").type("{enter}")
    cy.get("#continue_category_series").click();
    cy.get(".modal-backdrop").invoke("remove");
    cy.get("button[data-model='Series']")
      .click();
    cy.xpath("(//span[@role='combobox'])[3]").click();
    cy.get("input[role='searchbox']").type("Series").type("{enter}");
    cy.get("#continue_category_series").click();
    cy.get(".modal-backdrop").invoke("remove");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.xpath("(//input[@name='image[]'])[1]").attachFile("test.png");
    cy.get(".modal-backdrop").invoke("remove");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.xpath("(//textarea[@placeholder='Content'])[1]").clear().type("Test");
    cy.xpath("(//textarea[@placeholder='Content'])[2]").clear().type("Test");
    // cy.get("button[class='btn btn-primary btn-next']").click();
    // cy.get(".swal2-popup").should("be.visible").and("contain", "success");
  });

  it("Edit Produk", () => {
    cy.get("input[type='search']").type("test");
    cy.get("#table-product_wrapper").should("contain", "test");
    cy.get(".btn.btn-primary.btn-icon").click();
    cy.get("input[placeholder='Product Name']").clear().type("test2");
    cy.get("input[placeholder='Product SKU']").clear().type("test2");
    cy.get("input[placeholder='Product Barcode']").clear().type("test2");
    cy.get("input[placeholder='Product Weight']").clear().type("10");
    cy.get("input[placeholder='Product Width']").clear().type("10");
    cy.get("input[placeholder='Product Height']").clear().type("10");
    cy.get("input[placeholder='Product Length']").clear().type("10");
    cy.get("input[placeholder='Product Minimum Quantity']").clear().type("10");
    cy.get("#select2-type-container").click();
    cy.get("input[role='searchbox']").type("Ready Order").type("{enter}");
    cy.get("#select2-kind-container").click();
    cy.get("input[role='searchbox']").type("Finish Good").type("{enter}");
    cy.frameLoaded("iframe[title='Rich Text Editor, summary-ckeditor']");
    cy.iframe("iframe[title='Rich Text Editor, summary-ckeditor']")
      .clear()
      .type("Welcome");
    cy.get("button[class='btn btn-primary btn-next']").click();

    //cy.get("input[placeholder='Price']").type("10");
    cy.get("button[class='btn btn-primary btn-next']").click();

    // cy.get("button[data-model='Category']").click();
    // cy.xpath("(//span[@role='combobox'])[3]").click();
    // cy.get("input[role='searchbox']").type("Category").type("{enter}");
    // cy.get("#continue_category_series").click();
    // cy.get(".modal-backdrop").invoke("remove");
    // cy.xpath("//button[@data-model='Series'][normalize-space()='Select']")
    //   .should("be.visible")
    //   .click();
    // cy.xpath("(//span[@role='combobox'])[3]").click();
    // cy.get("input[role='searchbox']").type("Series").type("{enter}");
    // cy.get("#continue_category_series").click();
    // cy.get(".modal-backdrop").invoke("remove");
    cy.get("button[class='btn btn-primary btn-next']").click();

    // cy.xpath("(//input[@name='image[]'])[1]").attachFile("test.png");
    // cy.get(".modal-backdrop").invoke("remove");
    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get("button[class='btn btn-primary btn-next']").click();

    cy.get(".swal2-popup").should("be.visible").and("contain", "success");
    cy.get("input[type='search']").clear().type("test2");
    cy.get("#table-product_wrapper").should("contain", "test2");
  });

  it("Cari Produk", () => {
    cy.get("input[type='search']").clear().type("test2");
    cy.get("#table-product_wrapper").should("contain", "test2");
  });

  it("Hapus Produk", () => {
    cy.get("input[type='search']").clear().type("test2");
    cy.wait(1000);
    cy.get("button[name='button']").click();
    cy.xpath("//button[normalize-space()='Iya, hapus itu!']")
      .should("be.visible")
      .click();
    //cy.xpath("//button[normalize-space()='Kembali']").click();
    cy.get("#table-product_wrapper").should("not.contain", "test2");
  });
});
