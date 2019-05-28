import React from 'react';
import ReactDom from 'react-dom';
import QueryTable from '../QueryTable';

it('QueryTable renders without crashing', () => {
    const testData = [
            {name: "Simon", age: 20},
            {name: "Annika", age: 20},
            {name: "Lisa", age: 18},
        ];

    const div = document.createElement('div');
    ReactDom.render(<QueryTable data={testData}/>, div);
    ReactDom.unmountComponentAtNode(div);
});