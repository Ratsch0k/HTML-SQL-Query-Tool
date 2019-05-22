import React from 'react';
import ReactDom from 'react-dom';
import QueryInput from './QueryInput';
import renderer from 'react-test-renderer';

it('QueryInput renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<QueryInput />, div);
    ReactDom.unmountComponentAtNode(div);
});

it('change size when submitted', () => {
    var callbackValue = null;
    const mockUpParentFunction = (value) => {
        callbackValue = value;
    };

    const component = renderer.create(<QueryInput onClick={mockUpParentFunction}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});