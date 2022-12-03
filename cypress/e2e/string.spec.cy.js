import { circleContent, reverseInputCy, reverseBtnCy } from '../../src/constants/dom-content';

describe("String reverse algorithm tests", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  })

  it("Button is disabled, when input is empty", () => {
    cy.get(reverseInputCy).clear().should("have.value", "");
    cy.get(reverseBtnCy).should("be.disabled");
  })

  it("Circles are modified in correct order", () => {
    const TEXT_VALUE = "1234";

    cy.get(reverseInputCy).type(TEXT_VALUE);
    cy.get(reverseBtnCy).click();

    cy.get(circleContent)
      .should('have.length', 4)
      .each((value, index) => {
        cy.wrap(value).contains(TEXT_VALUE[index]);

        if (index === 0 || index === 3) {
          cy.wrap(value).find('[class*=circle_changing]');
        }

        if (index === 1) {
          cy.wrap(value).find('[class*=circle_default]');
        }
      });

    cy.get(circleContent)
      .should('have.length', 4)
      .each((value, index) => {
        cy.wrap(value).contains(TEXT_VALUE[TEXT_VALUE.length - 1 - index]);
        cy.wrap(value).find('[class*=modified]');
      });
  })
})