import { circleContent, fibonacciInputCy, fibonacciBtnCy } from '../../src/constants/dom-content';
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Fibonacci algorithm tests", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  })

  it("Button is disabled, when input is zero", () => {
    cy.get(fibonacciInputCy).clear().should("have.value", "0");
    cy.get(fibonacciBtnCy).should("be.disabled");
  })

  it("Fibonacci-page should render circles correctly", () => {
    cy.get(fibonacciInputCy).type('10');
    cy.get(fibonacciBtnCy).click()

    cy.wait(SHORT_DELAY_IN_MS * 10);

    cy.get(circleContent)
      .should('have.length', 10)
      .each((value, index) => {
        if (index === 0) cy.wrap(value).contains(1);
        if (index === 1) cy.wrap(value).contains(1);
        if (index === 2) cy.wrap(value).contains(2);
        if (index === 3) cy.wrap(value).contains(3);
        if (index === 4) cy.wrap(value).contains(5);
        if (index === 5) cy.wrap(value).contains(8);
        if (index === 6) cy.wrap(value).contains(13);
        if (index === 7) cy.wrap(value).contains(21);
        if (index === 8) cy.wrap(value).contains(34);
        if (index === 9) cy.wrap(value).contains(55);
        if (index === 10) cy.wrap(value).contains(89);
      });
  })
})