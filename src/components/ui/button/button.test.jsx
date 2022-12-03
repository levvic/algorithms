import React from "react";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Check props button", () => {
    it("Text on button is rendered correctly", () => {
        const tree = renderer.create(<Button text={"Test"} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Button without text", () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Button is disabled", () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Button shows isLoading icon", () => {
        const tree = renderer.create(<Button isLoader />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button onClick callback functionality test', () => {

        window.alert = jest.fn();

        render(<Button onClick={() => window.alert('text')} text={'test text'} />)

        const button = screen.getByText('test text');
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('text');
    })
});