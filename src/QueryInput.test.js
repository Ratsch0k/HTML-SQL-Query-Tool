import React from 'react';
import ReactDom from 'react-dom';
import QueryInput from './QueryInput';

it('QueryInput renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<QueryInput />, div);
    ReactDom.unmountComponentAtNode(div);
});


it('change size when submitted', () => {
        
});