import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circleContent, queueInputCy, queueAddBtnCy, queueRemoveBtnCy, queueClearBtnCy } from "../../src/constants/dom-content";

describe("Queue tests", () => {
    beforeEach(() => {
        cy.visit("/queue");
    });

    it("Buttons are disabled, when input is empty", () => {
        cy.get(queueInputCy).clear().should("have.value", "");
        cy.get(queueAddBtnCy).should("be.disabled");
        cy.get(queueRemoveBtnCy).should("be.disabled");
        cy.get(queueClearBtnCy).should("be.disabled");
    });

    it("Button Add adds element to queue", () => {
        cy.get(circleContent)
            .should('have.length', 0);
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("abc");
        cy.get(queueAddBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    expect(element).to.contain("abc");
                }
            });
    });

    it("First element is added to the top of queue", () => {
        cy.get(circleContent)
            .should('have.length', 0);
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("abc");
        cy.get(queueAddBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    expect(element).to.contain("abc");
                    expect(element).to.contain("top");
                }
            });
    });

    it("Button Add adds new element to the tail of queue", () => {
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("a");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("b");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("c");
        cy.get(queueAddBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === 2) {
                    cy.wrap(element).contains("c");
                    cy.wrap(element).contains("tail");
                }
            });
    });

    it("Button Remove removes element from the top of queue", () => {
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("a");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("b");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("c");
        cy.get(queueAddBtnCy).click();
        cy.get(queueRemoveBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === 1) {
                    cy.wrap(element).contains("b");
                    cy.wrap(element).contains("top");
                }
            });
    });

    it("Button Clear remove all elements from queue", () => {
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type(1);
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type(2);
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type(3);
        cy.get(queueAddBtnCy).click();
        cy.get(queueClearBtnCy).click();
        cy.get(circleContent)
            .each((element) => {
                expect(element).to.contain('');
                cy.wrap(element).find('[class*=circle_default]');
            });

        cy.get(queueAddBtnCy).should("be.disabled");
        cy.get(queueRemoveBtnCy).should("be.disabled");
        cy.get(queueClearBtnCy).should("be.disabled");
    });

    it("Add element animation", () => {
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("abs");
        cy.get(queueAddBtnCy).click();

        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    expect(element).to.contain("abs");
                    expect(element).to.contain("top");
                    expect(element).to.contain("tail");
                    cy.wrap(element).find('[class*=circle_changing]');
                }
            });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(queueInputCy).type("sec");
        cy.get(queueAddBtnCy).click();
        cy.get(circleContent).each((element, index) => {
            if (index === 0) {
                expect(element).to.contain("abs");
                expect(element).to.contain("top");
                cy.wrap(element).find('[class*=circle_default]');
            }

            if (index === 1) {
                expect(element).to.contain("sec");
                expect(element).to.contain("tail");
                cy.wrap(element).find('[class*=circle_changing]');
            }
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent).each((element, index) => {
            if (index === 0) {
                expect(element).to.contain("abs");
                expect(element).to.contain("top");
                cy.wrap(element).find('[class*=circle_default]');
            }

            if (index === 1) {
                expect(element).to.contain("sec");
                expect(element).to.contain("tail");
                cy.wrap(element).find('[class*=circle_default]');
            }
        });
    });

    it("Remove element animation", () => {
        cy.get(queueInputCy).clear();
        cy.get(queueInputCy).type("a");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("b");
        cy.get(queueAddBtnCy).click();
        cy.get(queueInputCy).type("c");
        cy.get(queueAddBtnCy).click();
        cy.get(queueRemoveBtnCy).click();
        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    expect(element).to.contain("a");
                    expect(element).to.contain("top");
                    cy.wrap(element).find('[class*=circle_changing]');
                }

                if (index === 1) {
                    expect(element).to.contain("b");
                    cy.wrap(element).find('[class*=circle_default]');
                }

                if (index === 2) {
                    expect(element).to.contain("c");
                    expect(element).to.contain("tail");
                    cy.wrap(element).find('[class*=circle_default]');
                }
            });

        cy.wait(SHORT_DELAY_IN_MS);


        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    expect(element).to.contain("");
                    cy.wrap(element).find('[class*=circle_default]');
                }

                if (index === 1) {
                    expect(element).to.contain("b");
                    expect(element).to.contain("top");
                    cy.wrap(element).find('[class*=circle_default]');
                }

                if (index === 2) {
                    expect(element).to.contain("c");
                    expect(element).to.contain("tail");
                    cy.wrap(element).find('[class*=circle_default]');
                }
            });
    });

})