import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circleContent, stackInputCy, stackAddBtnCy, stackRemoveBtnCy, stackClearBtnCy } from "../../src/constants/dom-content";

describe("Stack tests", () => {
    beforeEach(() => {
        cy.visit("/stack");
    });

    it("Buttons are disabled, when input is empty", () => {
        cy.get(stackInputCy).clear().should("have.value", "");
        cy.get(stackAddBtnCy).should("be.disabled");
        cy.get(stackRemoveBtnCy).should("be.disabled");
        cy.get(stackClearBtnCy).should("be.disabled");
    });

    it("Button Add adds element to stack", () => {
        cy.get(circleContent)
            .should('have.length', 0);
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 1);

    });

    it("Button Add adds element to the top of stack", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(3);
        cy.get(stackAddBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === index.length - 1) {
                    cy.wrap(element).contains("3");
                    cy.wrap(element).contains("top");
                }
            });
    });

    it("Button Remove removes element from stack", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(3);
        cy.get(stackAddBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 3);
        cy.get(stackRemoveBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 2);
    });

    it("Button Remove removes element from the top of stack", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(3);
        cy.get(stackAddBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 3);
        cy.get(stackRemoveBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === index.length - 1) {
                    cy.wrap(element).contains("2");
                    cy.wrap(element).contains("top");
                }
            });
    });

    it("Button Clear remove all elements from stack", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();
        cy.get(stackInputCy).type(3);
        cy.get(stackAddBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 3);
        cy.get(stackClearBtnCy).click();
        cy.get(circleContent)
            .should('have.length', 0);
    });

    it("Add circle animation", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();

        cy.get(circleContent)
            .should('have.length', 1)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_changing]');
            });

        cy.get(circleContent)
            .should('have.length', 1)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_default]');
            });

        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();

        cy.get(circleContent)
            .should('have.length', 2)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_default]');
                if (index === 1) cy.wrap(element).find('[class*=circle_changing]');
            });

        cy.get(circleContent)
            .should('have.length', 2)
            .each((element, index) => {
                if (index === 0 || index === 1) cy.wrap(element).find('[class*=circle_default]');
            });
    });

    it("Remove circle animation", () => {
        cy.get(stackInputCy).clear();
        cy.get(stackInputCy).type(1);
        cy.get(stackAddBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(stackInputCy).type(2);
        cy.get(stackAddBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(stackInputCy).type(3);
        cy.get(stackAddBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(stackRemoveBtnCy).click();

        cy.get(circleContent)
            .should('have.length', 3)
            .each((element, index) => {
                if (index === 0 || index === 1) cy.wrap(element).find('[class*=circle_default]');
                if (index === 2) cy.wrap(element).find('[class*=circle_changing]');
            });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .should('have.length', 2)
            .each((element, index) => {
                if (index === 0 || index === 1) cy.wrap(element).find('[class*=circle_default]');
            });

        cy.get(stackRemoveBtnCy).click();

        cy.get(circleContent)
            .should('have.length', 2)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_default]');
                if (index === 1) cy.wrap(element).find('[class*=circle_changing]');
            });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .should('have.length', 1)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_default]');
            });

        cy.get(stackRemoveBtnCy).click();

        cy.get(circleContent)
            .should('have.length', 1)
            .each((element, index) => {
                if (index === 0) cy.wrap(element).find('[class*=circle_changing]');
            });

        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleContent).should('have.length', 0);
    });

})