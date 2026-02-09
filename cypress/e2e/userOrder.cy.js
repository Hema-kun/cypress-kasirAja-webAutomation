import signIn from "../fixtures/user.json";

describe("User Order", () => {
  beforeEach("Masuk beranda", () => {
    cy.userLogin(signIn.email, signIn.password);
    cy.title().should("include", "Beranda");
  });

  it("Order tanpa produk", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").should(
      "have.attr",
      "disabled"
    );

    cy.get(".btn-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  });

  it("Order tanpa shipping method", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#processCheckout").click();

    cy.get(".swal2-popup").should("be.visible").and("contain", "Kesalahan");

    cy.go("back");
    cy.get(".btn-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  });

  it("Order tanpa shipping service", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#processCheckout").click();

    cy.get(".swal2-popup").should("be.visible").and("contain", "Kesalahan");

    cy.go("back");
    cy.get(".btn-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  });

  it("Order tanpa payment method", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#processCheckout").click();

    cy.get(".swal2-popup").should("be.visible").and("contain", "Kesalahan");

    cy.go("back");
    cy.get(".btn-delete").click();
    cy.get(".swal2-confirm").click();
    cy.get(".text-center.mt-5.mb-5").should("contain", "Tidak ada data");
  });

  it("Order tanpa isi form origin payment", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Order tanpa isi form origin payment name", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Order tanpa isi form origin payment number", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name").type("Hema");
    cy.get("#orderPayment_origin_payment_number")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Order tanpa isi form destination payment", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name").type("Hema");
    cy.get("#orderPayment_origin_payment_number").type("8080");
    cy.get("#orderPayment_destination_payment")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Order tanpa isi form destination payment name", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name").type("Hema");
    cy.get("#orderPayment_origin_payment_number").type("8080");
    cy.get("#orderPayment_destination_payment").type("BCA");
    cy.get("#orderPayment_destination_payment_name")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Order tanpa isi form destination number", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();

    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name").type("Hema");
    cy.get("#orderPayment_origin_payment_number").type("8080");
    cy.get("#orderPayment_destination_payment").type("BCA");
    cy.get("#orderPayment_destination_payment_name").type("test");
    cy.get("#orderPayment_destination_payment_number")
      .invoke("prop", "validationMessage")
      .should("contain", "Silahkan isi kolomnya");

  });

  it("Checkout berhasil", () => {
    cy.xpath("(//div[@class='product-view'])[36]").invoke('attr', 'style', 'display: none');
    cy.xpath("//a[normalize-space()='Contoh Product']")
      .first().click()
    cy.get("#add-to-cart").click().wait(500);
    cy.get(".swal2-popup").should("be.visible").and("contain", "Berhasil");
    cy.get("a[href='https://wikanta.com/cart']").click();

    cy.get("input[type='checkbox']").check()
    //cy.xpath("//label[@for='cart_30']").check()
    cy.xpath("//button[@id='processToCheckout']").click();

    cy.get("#shipping_method_2").check();
    cy.get("#shipping_service_1").check();
    cy.get("#payment_method_2").check();
    cy.get("#processCheckout").click();

    cy.xpath("//a[normalize-space()='Konfirmasi Disini']").click();
    cy.get("#orderPayment_origin_payment").type("BCA");
    cy.get("#orderPayment_origin_payment_name").type("Hema");
    cy.get("#orderPayment_origin_payment_number").type("8080");
    cy.get("#orderPayment_destination_payment").type("BCA");
    cy.get("#orderPayment_destination_payment_name").type("test");
    cy.get("#orderPayment_destination_payment_number").type("5050");
    cy.get("input[name='orderPayment[transaction_date]']").type("2025-07-03T08:30");
    cy.xpath("(//input[@name='image[]'])[1]").attachFile("test.png");
    cy.xpath("//button[normalize-space()='Konfirmasi']").click();
    //cy.xpath("//button[normalize-space()='Atur Kembali']").click()
    cy.get('.page-content').should("contain", "INV/2025/07/12");
  });
});
