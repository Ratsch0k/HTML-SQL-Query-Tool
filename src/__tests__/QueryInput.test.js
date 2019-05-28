import React from 'react';
import ReactDom from 'react-dom';
import QueryInput from '../QueryInput';
import renderer from 'react-test-renderer';
import {cleanup, fireEvent, render} from "react-testing-library";

afterEach(cleanup);

it('QueryInput renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<QueryInput />, div);
    ReactDom.unmountComponentAtNode(div);
});

it('input changes when submitted', () => {
    const testInput = 'testInput';
    const mockUpParentFunction = (value) => {
        expect(value).toBe(testInput);
    };

    const component = renderer.create(<QueryInput onRequest={mockUpParentFunction}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Click submit button and check if matches snapshot
    // Mock event with preventDefault
    let mockEvent = {
        preventDefault() {
            return null;
        },
        target: {
            value: testInput,
        },
    };

    tree.children[0].children[0].props.onChange(mockEvent);
    tree.props.onSubmit(mockEvent);
    // re-render
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});