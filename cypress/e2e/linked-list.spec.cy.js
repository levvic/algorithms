import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
    circleContent, listInputValueCy, listInputIndexCy,
    listAddByIndexBtnCy, listRemoveByIndexBtnCy,
    listAddToHeadBtnCy, listAddToTailBtnCy, listRemoveFromHeadBtnCy, listRemoveFromTailBtnCy, 
} from "../../src/constants/dom-content";

describe("Linked list tests", () => {
    beforeEach(() => {
        cy.visit("/list");
    });

    it("Buttons are disabled, when input is empty", () => {
        cy.get(listInputValueCy).clear().should("have.value", "");
        cy.get(listInputIndexCy).clear().should("have.value", "");
        cy.get(listAddToHeadBtnCy).should("be.disabled");
        cy.get(listAddToTailBtnCy).should("be.disabled");
        cy.get(listAddByIndexBtnCy).should("be.disabled");
        cy.get(listRemoveByIndexBtnCy).should("be.disabled");
    });

    it("All buttons are disabled, when list and input are empty", () => {
        cy.get(listInputValueCy).clear().should("have.value", "");
        cy.get(listInputIndexCy).clear().should("have.value", "");

        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.get(listRemoveFromTailBtnCy).click();
            });

        cy.get(listAddToHeadBtnCy).should("be.disabled");
        cy.get(listAddToTailBtnCy).should("be.disabled");
        cy.get(listAddByIndexBtnCy).should("be.disabled");
        cy.get(listRemoveByIndexBtnCy).should("be.disabled");
        cy.get(listRemoveFromHeadBtnCy).should("be.disabled");
        cy.get(listRemoveFromTailBtnCy).should("be.disabled");
    });

    it("Initial list generation", () => {
        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.wrap(element).find('[class*=circle_default]');
                if (index === 0) cy.wrap(element).contains("head");
                if (index === arr.length - 1) cy.wrap(element).contains("tail");
            });
    });

    it("Add element to the head of list", () => {
        cy.get(listInputValueCy).type("abc");
        cy.get(listAddToHeadBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    cy.wrap(element).contains("abc");
                    cy.wrap(element).contains("head");
                }
            });
    });

    it("Add element to the tail of list", () => {
        cy.get(listInputValueCy).type("new");
        cy.get(listAddToTailBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index, arr) => {
                if (index === arr.length - 1) {
                    cy.wrap(element).contains("new");
                    cy.wrap(element).contains("tail");
                }
            });
    });

    it("Remove element from the head of list", () => {
        // clear default list
        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.get(listRemoveFromTailBtnCy).click();
            });

        cy.get(listInputValueCy).type("1");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("2");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("3");
        cy.get(listAddToTailBtnCy).click();

        cy.get(listRemoveFromHeadBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index) => {
                if (index === 0) {
                    cy.wrap(element).contains("2");
                    cy.wrap(element).contains("head");
                }
            });
    });

    it("Remove element from the tail of list", () => {
        // clear default list
        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.get(listRemoveFromTailBtnCy).click();
            });

        cy.get(listInputValueCy).type("1");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("2");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("3");
        cy.get(listAddToTailBtnCy).click();

        cy.get(listRemoveFromTailBtnCy).click();
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index, arr) => {
                if (index === arr.length - 1) {
                    cy.wrap(element).contains("2");
                    cy.wrap(element).contains("tail");
                }
            });
    });

    it("Add element by index", () => {
        // clear default list
        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.get(listRemoveFromTailBtnCy).click();
            });

        cy.get(listInputValueCy).type("1");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("2");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("3");
        cy.get(listAddToTailBtnCy).click();

        cy.get(listInputValueCy).type("abc");
        cy.get(listInputIndexCy).type(1);
        cy.get(listAddByIndexBtnCy).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index) => {
                if (index === 1) {
                    cy.wrap(element).contains("abc");
                }
            });
    });

    it("Remove element by index", () => {
        // clear default list
        cy.get(circleContent)
            .each((element, index, arr) => {
                cy.get(listRemoveFromTailBtnCy).click();
            });

        cy.get(listInputValueCy).type("1");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("2");
        cy.get(listAddToTailBtnCy).click();
        cy.get(listInputValueCy).type("3");
        cy.get(listAddToTailBtnCy).click();

        cy.get(listInputIndexCy).type(1);
        cy.get(listRemoveByIndexBtnCy).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circleContent)
            .each((element, index) => {
                if (index === 1) {
                    cy.wrap(element).contains("3");
                }
            });
    });

})