import React from 'react';
import ReactDom from 'react-dom';
import QueryTable from '../QueryTable';
import renderer from 'react-test-renderer';

const testData1 = [
    {name: "Simon", age: 20},
    {name: "Annika", age: 20},
    {name: "Lisa", age: 18},
];

const testData2 = [
    {email: "test@web.de", username: "rat", age: 43, password: "password"},
    {email: "user@yahoo.it", username: "user", age: 17, password: "asdfad"},
    {email: "tree@o2.de", username: "tree", age: 18, password: "asdfasdfasw"},
    {email: "benutzer@gmail.com", username: "benutzer", age: 98, password: "afsthtr"},
];


it('QueryTable with data renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<QueryTable data={testData1}/>, div);
    ReactDom.unmountComponentAtNode(div);
});

it('QueryTable without data renders without crashes', () => {
    const div = document.createElement('div');
    ReactDom.render(<QueryTable/>, div);
    ReactDom.unmountComponentAtNode(div);
})

it('QueryTable changes renders new if data changes', () => {
    let component = renderer.create(<QueryTable/>);
    let tree;

    // First render without data
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Second render with first test data
    component = renderer.create(<QueryTable data={testData1}/>);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // Third render with second test data
    tree.props.data = testData2;
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});