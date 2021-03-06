const { beforeEach } = require("mocha");

describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get('[alt="Add"]').first().click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get('[alt="Edit"]').click({ force: true });

    cy.get('[alt="Tori Malcolm"]').click();

    cy.get("[data-testid=student-name-input]").clear().type("Salim Mustafa");

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Salim Mustafa");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("shouls cancel an interview", () => {
    cy.get("[alt='Delete']").click({ force: true });

    cy.contains("Confirm").click();

    cy.get("[alt='Loading']").should("exist");

    cy.get("[alt='Loading']").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
